const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const stripe = require('stripe');
const multer = require('multer');
const { OpenAI } = require('openai');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const morgan = require('morgan');
const helmet = require('helmet');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet({
  contentSecurityPolicy: false, // Disable for easier dev/preview
}));

// Configure Stripe
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

// Configure AI (OpenRouter)
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || 'sk-or-placeholder',
});

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Database helper
function runSql(sql) {
  try {
    const result = execSync(`team-db "${sql.replace(/"/g, '\\"')}"`).toString();
    return JSON.parse(result);
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}

// Routes

// Upload and Create Stripe Session
app.post('/api/upload-and-pay', upload.single('file'), async (req, res) => {
  try {
    const { name, email, councilName, ticketType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const id = Date.now().toString();
    
    // Initial record in DB
    runSql(`INSERT INTO appeals (id, user_name, user_email, council_name, ticket_type, file_path, status) VALUES ('${id}', '${name}', '${email}', '${councilName}', '${ticketType}', '${file.path}', 'pending')`);

    // Create Stripe Checkout Session
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'FightYourPCN Appeal Draft',
              description: `AI-generated appeal draft for ${ticketType} - ${councilName}`,
            },
            unit_amount: 100, // £1.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/upload`,
      metadata: {
        appealId: id,
      },
    });

    // Update session_id in DB
    runSql(`UPDATE appeals SET session_id = '${session.id}' WHERE id = '${id}'`);

    res.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Error in /upload-and-pay:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Appeal Status/Result
app.get('/api/appeal-status', async (req, res) => {
  try {
    const { session_id } = req.query;
    const results = runSql(`SELECT * FROM appeals WHERE session_id = '${session_id}'`);
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Appeal not found' });
    }

    const appeal = results[0];

    if (appeal.status === 'completed') {
      return res.json({ status: 'completed', appeal: { content: appeal.appeal_content } });
    }

    // If it's still pending/processing, check if payment is actually done
    const session = await stripeClient.checkout.sessions.retrieve(session_id);
    
    if (session.payment_status === 'paid') {
      if (appeal.status === 'pending') {
        // Start AI generation (async)
        generateAppeal(appeal.id);
        runSql(`UPDATE appeals SET status = 'processing' WHERE id = '${appeal.id}'`);
      }
      return res.json({ status: 'processing' });
    } else {
      return res.json({ status: 'awaiting_payment' });
    }
  } catch (error) {
    console.error('Error in /appeal-status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Download PDF
app.get('/api/download-pdf', async (req, res) => {
  try {
    const { session_id } = req.query;
    const results = runSql(`SELECT * FROM appeals WHERE session_id = '${session_id}'`);
    
    if (results.length === 0 || !results[0].appeal_content) {
      return res.status(404).json({ error: 'Appeal not found or not ready' });
    }

    const appeal = results[0];

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    const lines = appeal.appeal_content.split('\n');
    let y = height - 50;
    
    page.drawText('FightYourPCN - Appeal Draft', {
      x: 50,
      y: y,
      size: 14,
      font,
      color: rgb(0.1, 0.2, 0.4),
    });
    
    y -= 40;
    
    for (const line of lines) {
      if (y < 50) {
        // Add new page if needed (simplified for MVP)
        break; 
      }
      page.drawText(line, {
        x: 50,
        y: y,
        size: 10,
        font,
      });
      y -= 15;
    }

    const pdfBytes = await pdfDoc.save();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Appeal.pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error in /download-pdf:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// AI Generation Logic
async function generateAppeal(appealId) {
  try {
    const results = runSql(`SELECT * FROM appeals WHERE id = '${appealId}'`);
    const appeal = results[0];

    // In a real app, we would perform OCR on appeal.file_path here.
    // For MVP, we'll tell the AI about the user-provided info and ask it to draft based on that.
    
    const prompt = `
      You are a UK parking ticket appeal expert. 
      Generate a professional appeal draft for the following parking ticket:
      User Name: ${appeal.user_name}
      Council/Authority: ${appeal.council_name}
      Ticket Type: ${appeal.ticket_type}
      
      Requirements:
      1. Use formal British English.
      2. Address it to the ${appeal.council_name}.
      3. Include common legal grounds for appeal (e.g., poor signage, mitigating circumstances, procedural impropriety).
      4. Include a disclaimer at the end that this is a draft and not legal advice.
      5. Make it persuasive and professional.
      
      Draft:
    `;

    const response = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo', // Or a better model
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.choices[0].message.content;

    // Update DB
    runSql(`UPDATE appeals SET appeal_content = '${content.replace(/'/g, "''")}', status = 'completed' WHERE id = '${appealId}'`);
    console.log(`Appeal ${appealId} generated successfully.`);
  } catch (error) {
    console.error('AI Generation Failed:', error);
    runSql(`UPDATE appeals SET status = 'failed' WHERE id = '${appealId}'`);
  }
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
