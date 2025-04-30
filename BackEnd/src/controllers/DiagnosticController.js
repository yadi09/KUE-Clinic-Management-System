import Diagnostic from '../models/Diagnostic.js';

// Create a new diagnostic
export const createDiagnostic = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if diagnostic already exists
        const existingDiagnostic = await Diagnostic.findOne({ name });
        if (existingDiagnostic) {
            return res.status(400).json({ message: "Diagnostic already exists" });
        }

        // Create new diagnostic
        const diagnostic = new Diagnostic({
            name,
            description,
        });

        await diagnostic.save();
        res.status(201).json(diagnostic);
    } catch (error) {
        console.error("Error creating diagnostic:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all diagnostics
export const getDiagnostics = async (req, res) => {
    try {
        const diagnostics = await Diagnostic.find();
        res.status(200).json(diagnostics);
    } catch (error) {
        console.error("Error fetching diagnostics:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

