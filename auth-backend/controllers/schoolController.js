import db from "../db/connection.js";

/* get all schools assigned to a teacher (instructor) */
export const getSchools = async (req, res) => {
    try {
        const [rows] = await db.query (
            `SELECT s.id, s.name, s.location
            FROM schools s
            JOIN teacher_school ts ON s.id = ts.school_id
            WHERE ts.teacher_id = ?`,
            [req.user.id]   // req.user is set by authMiddleware, contains { id: user.id }
        );
        res.status(200).json({schools: rows});
    }
    catch (error) {
        console.error("Error fetching schools:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

// adding schools is a part of the admin panel, not the instructor (teacher) panel

/* school-teacher linking/ assigning a school to a teacher */
export const assignSchool = async (req, res) => {
    const { school_id } = req.body;
    const teacher_id = req.user.id;

    try {
        await db.query (
            "INSERT INTO teacher_school (teacher_id, school_id) VALUES (?, ?)",
            [teacher_id, school_id]
        );
        res.status(201).json({message: "School assigned to teacher successfully"});
    }
    catch (error) {
        if (error.code === 'ER_DUP_ENTRY') { // this error happens when trying to insert a duplicate entry
            return res.status(400).json({message: "School already assigned to this teacher"});
        }
        console.error("Error assigning school:", error);
        res.status(500).json({message: "Internal server error"});
    }
};