export const indexPage = (req, res) => res.status(200).json({ message: 'Home controller updated..' });

export const getTemplates = (req, res) => {
    res.status(200).json({
        message: 'Successfully fetched templates',
        data: [
            'Bonus Letter',
            'Only Hike Letter',
            'Promotion Letter',
            'Hike with Promotion Letter'
        ]
    })
}