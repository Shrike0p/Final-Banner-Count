const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get Banner Details
app.get('/api/banner', async (req, res) => {
    try {
        const banner = await prisma.banner.findFirst();
        res.json(banner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching banner details' });
    }
});

// Update Banner Details
app.post('/api/banner', async (req, res) => {
    const { title, description, timer, link, visible } = req.body; // Include title and visibility
    try {
        const updatedBanner = await prisma.banner.upsert({
            where: { id: 1 },
            update: { title, description, timer, link, visible }, // Update visibility and title
            create: { title, description, timer, link, visible }, // Create with title and visibility
        });
        res.json(updatedBanner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating banner details' });
    }
});

// Change the port to the one provided by Vercel
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
