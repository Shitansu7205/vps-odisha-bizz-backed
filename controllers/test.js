const test = (req, res) => {
    try {
        const data = [
            { id: 1, name: "John Doe", email: "john@example.com" },
            { id: 2, name: "Jane Smith", email: "jane@example.com" },
            { id: 3, name: "Alex Johnson", email: "alex@example.com" }
        ];

        return res.status(200).json({
            message: "Test successful",
            data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export default test;
