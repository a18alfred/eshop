const isAdmin = (req, res, next) => {
    const {role} = req.user;
    if (role !== 'admin') {
        return res.status(403).json({message: 'Недостаточно прав для данного запроса'});
    }
    next();
};

module.exports = isAdmin;