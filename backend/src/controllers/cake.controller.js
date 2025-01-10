import Cake from "../models/cake.model.js";

async function seed(req, res) {
  try {
    await Cake.create([
      {
        name: "cake1",
        description: "Cake 1 example dis",
        category: "Something",
        price: 20,
        imageUrl: "hello",
      },
      {
        name: "cake2",
        description: "Cake 2 example dis",
        category: "Something2",
        price: 15,
        imageUrl: "hello2",
      },
      {
        name: "cake3",
        description: "Cake 3 example dis",
        category: "Something3",
        price: 30,
        imageUrl: "hello3",
      },
      {
        name: "cake4",
        description: "Cake 4 example dis",
        category: "Something4",
        price: 40,
        imageUrl: "hello4",
      },
    ]);
    res.send("successful").status(200);
  } catch (err) {
    res.send(err).status(400);
  }
}

const getEntries = async (req, res) => {
  try {
    const foundEntries = await Cake.find({});
    res.status(200).json(foundEntries);
  } catch (err) {
    res.send(err).status(400);
  }
};

export default { seed, getEntries };
