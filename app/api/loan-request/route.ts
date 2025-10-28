// app/api/loan-request/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Récupérer les données
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      birthDate: formData.get('birthDate') as string,
      birthPlace: formData.get('birthPlace') as string,
      profession: formData.get('profession') as string,
      monthlyIncome: formData.get('monthlyIncome') as string,
      loanAmount: formData.get('loanAmount') as string,
      repaymentDuration: formData.get('repaymentDuration') as string,
      loanPurpose: formData.get('loanPurpose') as string,
    };
    
    const idDocument = formData.get('idDocument') as File;

    // Validation
    if (!data.email || !data.firstName || !data.lastName) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Convertir le fichier en base64 pour l'email
    let attachmentData = null;
    if (idDocument && idDocument.size > 0) {
      const bytes = await idDocument.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachmentData = {
        filename: idDocument.name,
        content: buffer,
      };
    }

    // Traduire le motif du prêt
    const loanPurposeLabels: Record<string, string> = {
      personal: 'Personnel',
      business: 'Professionnel',
      renovation: 'Rénovation',
      vehicle: 'Véhicule',
      debt: 'Regroupement de crédits',
      other: 'Autre'
    };

    // Envoyer l'email
    const emailData = await resend.emails.send({
      from: 'Solidis Finance <onboarding@resend.dev>',
      to: 'solideofinance@gmail.com',
      replyTo: data.email,
      subject: `💰 Nouvelle demande de prêt - ${data.firstName} ${data.lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #ef4444 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #f9fafb; padding: 30px; }
            .section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981; }
            .section h2 { margin-top: 0; color: #10b981; font-size: 18px; }
            .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
            .info-row:last-child { border-bottom: none; }
            .label { font-weight: bold; min-width: 180px; color: #6b7280; }
            .value { color: #111827; }
            .highlight { background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💰 Nouvelle demande de prêt</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Reçue le ${new Date().toLocaleString('fr-FR')}</p>
            </div>
            
            <div class="content">
              <div class="section">
                <h2>👤 Informations personnelles</h2>
                <div class="info-row">
                  <span class="label">Nom complet:</span>
                  <span class="value">${data.firstName} ${data.lastName}</span>
                </div>
                <div class="info-row">
                  <span class="label">Email:</span>
                  <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
                </div>
                <div class="info-row">
                  <span class="label">Téléphone:</span>
                  <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
                </div>
                <div class="info-row">
                  <span class="label">Date de naissance:</span>
                  <span class="value">${data.birthDate}</span>
                </div>
                <div class="info-row">
                  <span class="label">Lieu de naissance:</span>
                  <span class="value">${data.birthPlace}</span>
                </div>
                <div class="info-row">
                  <span class="label">Profession:</span>
                  <span class="value">${data.profession}</span>
                </div>
                <div class="info-row">
                  <span class="label">Revenu mensuel:</span>
                  <span class="value">${Number(data.monthlyIncome).toLocaleString('fr-FR')}€</span>
                </div>
              </div>
              
              <div class="section">
                <h2>💼 Détails du prêt demandé</h2>
                <div class="info-row">
                  <span class="label">Montant demandé:</span>
                  <span class="value" style="font-size: 18px; font-weight: bold; color: #10b981;">${Number(data.loanAmount).toLocaleString('fr-FR')}€</span>
                </div>
                <div class="info-row">
                  <span class="label">Durée de remboursement:</span>
                  <span class="value">${data.repaymentDuration} mois</span>
                </div>
                <div class="info-row">
                  <span class="label">Motif du prêt:</span>
                  <span class="value">${loanPurposeLabels[data.loanPurpose] || data.loanPurpose}</span>
                </div>
              </div>
              
              <div class="highlight">
                <strong>📎 Pièce d'identité:</strong> ${idDocument ? `Fichier joint : ${idDocument.name}` : 'Non fournie'}
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${data.email}" style="display: inline-block; background: #10b981; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                  ✉️ Répondre au client
                </a>
              </div>
            </div>
            
            <div class="footer">
              <p>Cet email a été envoyé automatiquement depuis votre formulaire Solidis Finance</p>
              <p>Ne répondez pas à cet email, utilisez l'adresse du client : ${data.email}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: attachmentData ? [attachmentData] : undefined,
    });

    console.log('✅ Email envoyé avec succès:', emailData.id);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Demande envoyée avec succès',
        id: emailData.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}