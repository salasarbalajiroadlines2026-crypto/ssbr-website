document.getElementById('ssbrQuoteForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Raw input credentials fetch
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const route = document.getElementById('clientRoute').value;
    const desc = document.getElementById('clientDesc').value;

    const formData = { name, email, phone, route, desc };

    try {
        // 1. Dispatch background data to Node backend secure relay
        await fetch('/api/inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        console.log("Secure Node Mail processing handshake complete.");
    } catch (err) {
        console.error("Local network server isolated. Redirecting workflow directly onto WhatsApp layout:", err);
    }

    // 2. Clear Professional WhatsApp text structuring layout
    const myWhatsAppNumber = "919999999999"; // <-- 🛑 YAHAN APNA VALE ORIGINAL WHATSAPP NUMBER DAAL DO BHAI

    const whatsappMessage = `*🔥 NEW SSBR COMMERCIAL PROCUREMENT QUERY *%0A%0A` +
        `*👤 Contractor/Company Name:* ${encodeURIComponent(name)}%0A` +
        `*📧 Email Address:* ${encodeURIComponent(email)}%0A` +
        `*📞 Contact Number:* ${encodeURIComponent(phone)}%0A` +
        `*📍 Logistics Delivery Route:* ${encodeURIComponent(route)}%0A%0A` +
        `*📋 Requirements & Matrix Specifications:*%0A${encodeURIComponent(desc)}%0A%0A` +
        `_Generated via SSBR Corporate Asset Portal Core._`;

    const whatsappUrl = `https://wa.me/${myWhatsAppNumber}?text=${whatsappMessage}`;

    // Redirect launch
    window.open(whatsappUrl, '_blank');
});