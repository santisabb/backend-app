import { User } from "./userEntity.js";
import { UserRepository } from "./userRepository.js";
const userRepo = new UserRepository();
function sanitizeUserInput(req, res, next) {
    req.body.sanitizedInput = {
        name: req.body.name,
        mail: req.body.mail,
        phone: req.body.phone,
        totalReserves: req.body.totalReserves
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
function findAll(req, res) {
    res.json({ message: 'USERS', data: userRepo.findAll() });
}
function findOne(req, res) {
    const id = req.params.id;
    const user = userRepo.findOne({ id });
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User founded', data: user });
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const userInput = new User(input.name, input.mail, input.phone, input.totalReserves);
    const user = userRepo.add(userInput);
    res.status(201).json({ message: 'User added', data: user });
}
function update(req, res) {
    req.body.sanitizedInput.id = req.params.id;
    const user = userRepo.update(req.body.sanitizedInput);
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User modified', data: user });
}
function remove(req, res) {
    const id = req.params.id;
    const user = userRepo.delete({ id });
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
}
export { sanitizeUserInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=userController.js.map