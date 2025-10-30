import Lead from "../models/leadsForm.js";

// ✅ Save new lead
export const createLead = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, purpose, message } = req.body;

        // Validation
        if (!firstName || !email || !purpose || !message) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }

        const lead = new Lead({
            firstName,
            lastName,
            email,
            phone,
            purpose,
            message,
        });

        await lead.save();
        res.status(201).json({ message: "Lead saved successfully", lead });
    } catch (error) {
        console.error("Error saving lead:", error);
        res.status(500).json({ message: "Server error. Try again later." });
    }
};

// ✅ Get all leads (for admin)
export const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json(leads);
    } catch (error) {
        console.error("Error fetching leads:", error);
        res.status(500).json({ message: "Server error." });
    }
};
