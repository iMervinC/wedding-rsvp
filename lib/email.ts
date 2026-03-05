import type { RSVPFormData } from './validations';

const MEAL_LABELS: Record<string, string> = {
  chicken: 'Chicken',
  fish: 'Fish',
  vegetarian: 'Vegetarian',
};

/** HTML email sent to the couple */
export function buildCoupleEmail(data: RSVPFormData): { subject: string; html: string; text: string } {
  const attending = data.attending === 'yes';
  const statusColor = attending ? '#22c55e' : '#ef4444';
  const statusLabel = attending ? 'YES — Attending' : 'NO — Not Attending';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Wedding RSVP</title>
</head>
<body style="margin:0;padding:0;background:#fdf6ec;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf6ec;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#e04f7a,#cc2f5e);padding:40px 40px 30px;text-align:center;">
              <p style="margin:0 0 8px;font-style:italic;color:rgba(255,255,255,0.8);font-size:16px;">New RSVP Received</p>
              <h1 style="margin:0;color:#ffffff;font-size:36px;font-weight:normal;letter-spacing:1px;">Sophie &amp; James</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.7);font-size:14px;font-family:sans-serif;letter-spacing:2px;text-transform:uppercase;">Wedding · June 15, 2026</p>
            </td>
          </tr>

          <!-- Status banner -->
          <tr>
            <td style="background:${statusColor};padding:14px 40px;text-align:center;">
              <p style="margin:0;color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:bold;letter-spacing:1px;">
                ${statusLabel}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 24px;color:#8c1e3d;font-size:22px;font-weight:normal;border-bottom:1px solid #fce4ec;padding-bottom:12px;">
                Guest Details
              </h2>

              ${row('Full Name', data.fullName)}
              ${row('Email', data.email)}
              ${row('Attending', statusLabel)}
              ${attending ? row('Number of Guests', String(data.guestCount ?? 1)) : ''}
              ${attending && data.mealPreference ? row('Meal Preference', MEAL_LABELS[data.mealPreference] ?? data.mealPreference) : ''}
              ${data.message ? row('Message to the Couple', data.message, true) : ''}
              ${data.songRequest ? row('Song Request', data.songRequest) : ''}

              <p style="margin:32px 0 0;font-family:sans-serif;font-size:13px;color:#9ca3af;text-align:center;">
                This RSVP was submitted via your wedding website.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#fdf2f5;padding:24px 40px;text-align:center;border-top:1px solid #fce4ec;">
              <p style="margin:0;font-style:italic;color:#e04f7a;font-size:18px;">Sophie &amp; James · June 15, 2026</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = [
    'New Wedding RSVP',
    '================',
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Attending: ${statusLabel}`,
    attending ? `Guests: ${data.guestCount ?? 1}` : '',
    attending && data.mealPreference ? `Meal: ${MEAL_LABELS[data.mealPreference]}` : '',
    data.message ? `Message: ${data.message}` : '',
    data.songRequest ? `Song Request: ${data.songRequest}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  return {
    subject: `New Wedding RSVP — ${data.fullName} (${data.attending === 'yes' ? 'Attending' : 'Not Attending'})`,
    html,
    text,
  };
}

/** Confirmation email sent to the guest */
export function buildGuestConfirmationEmail(data: RSVPFormData): { subject: string; html: string; text: string } {
  const attending = data.attending === 'yes';
  const firstName = data.fullName.split(' ')[0];

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSVP Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#fdf6ec;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf6ec;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#e04f7a,#cc2f5e);padding:40px;text-align:center;">
              <p style="margin:0 0 6px;color:rgba(255,255,255,0.75);font-size:15px;font-style:italic;">RSVP Confirmation</p>
              <h1 style="margin:0;color:#ffffff;font-size:38px;font-weight:normal;">Sophie &amp; James</h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.7);font-size:13px;font-family:sans-serif;letter-spacing:3px;text-transform:uppercase;">June 15, 2026 · Tuscany, Italy</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;text-align:center;">
              <p style="font-size:28px;margin:0 0 16px;">
                ${attending ? '&#x2665;' : '&#x2709;'}
              </p>
              <h2 style="margin:0 0 16px;color:#8c1e3d;font-size:26px;font-weight:normal;">
                ${attending ? `We cannot wait to see you, ${firstName}!` : `We will miss you, ${firstName}!`}
              </h2>
              <p style="margin:0 0 24px;color:#6b7280;font-family:sans-serif;line-height:1.7;font-size:15px;">
                ${
                  attending
                    ? `Thank you so much for your RSVP! We are thrilled that you will be joining us to celebrate our special day. Below is a summary of your response.`
                    : `Thank you for letting us know. We completely understand and will be thinking of you on our special day.`
                }
              </p>

              <!-- Summary box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf2f5;border-radius:12px;overflow:hidden;margin:0 0 28px;">
                <tr><td style="padding:24px 28px;">
                  ${row('Name', data.fullName)}
                  ${row('Attending', attending ? 'Yes, attending' : 'Not attending')}
                  ${attending ? row('Guests', String(data.guestCount ?? 1)) : ''}
                  ${attending && data.mealPreference ? row('Meal', MEAL_LABELS[data.mealPreference] ?? data.mealPreference) : ''}
                  ${data.songRequest ? row('Song Request', data.songRequest) : ''}
                </td></tr>
              </table>

              ${
                attending
                  ? `<div style="background:#f0f5ee;border-radius:12px;padding:20px 24px;text-align:left;margin-bottom:24px;">
                      <p style="margin:0 0 8px;color:#5a7a50;font-family:sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:2px;font-weight:bold;">Event Details</p>
                      <p style="margin:0;color:#374151;font-family:sans-serif;font-size:14px;line-height:1.7;">
                        <strong>Date:</strong> Saturday, June 15, 2026<br>
                        <strong>Ceremony:</strong> 4:00 PM (arrive from 3:00 PM)<br>
                        <strong>Venue:</strong> Villa Medicea di Lilliano, Tuscany, Italy<br>
                        <strong>Dress Code:</strong> Garden formal
                      </p>
                    </div>`
                  : ''
              }

              <p style="margin:0;color:#9ca3af;font-family:sans-serif;font-size:13px;line-height:1.7;">
                If you have any questions, please reach out to us at
                <a href="mailto:${process.env.COUPLE_EMAIL ?? 'couple@example.com'}" style="color:#e04f7a;">
                  ${process.env.COUPLE_EMAIL ?? 'couple@example.com'}
                </a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#fdf2f5;padding:24px 40px;text-align:center;border-top:1px solid #fce4ec;">
              <p style="margin:0;font-style:italic;color:#e04f7a;font-size:20px;">With love, Sophie &amp; James</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = attending
    ? `Dear ${firstName},\n\nThank you for your RSVP! We are so excited to have you at our wedding on June 15, 2026.\n\nVenue: Villa Medicea di Lilliano, Tuscany, Italy\nCeremony: 4:00 PM\n\nWith love,\nSophie & James`
    : `Dear ${firstName},\n\nThank you for letting us know. We will miss you on our special day.\n\nWith love,\nSophie & James`;

  return {
    subject: attending
      ? 'Your RSVP is confirmed — Sophie & James Wedding'
      : 'We received your RSVP — Sophie & James Wedding',
    html,
    text,
  };
}

/** Shared helper to render a detail row */
function row(label: string, value: string, multiline = false): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
      <tr>
        <td style="font-family:sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;font-weight:bold;padding-bottom:2px;">${label}</td>
      </tr>
      <tr>
        <td style="font-family:sans-serif;font-size:15px;color:#374151;${multiline ? 'white-space:pre-wrap;' : ''}">${value}</td>
      </tr>
    </table>
  `;
}
