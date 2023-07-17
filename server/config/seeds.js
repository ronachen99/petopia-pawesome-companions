// first connect to the database
const db = require("./connection");
// import the models for seeding
const { User, Pet, Species, Need } = require("../models");

// once connected then...
db.once("open", async () => {
  try {
    // delete existing data
    await User.deleteMany();
    await Pet.deleteMany();
    await Species.deleteMany();
    await Need.deleteMany();

    // create sample users
    const user1 = await User.create({
      email: "user1@gmail.com",
      password: "12345",
    });
    const user2 = await User.create({
      email: "user2@gmail.com",
      password: "12345",
    });

    // define the species with its needs
    const speciesData = [
      {
        speciesType: "Dog",
        description: "Canine",
        image: "./images/dog.png",
        alt: "cute pixel dog",
        needs: [
          { needType: "Food", description: "High-quality dog food" },
          { needType: "Exercise", description: "Regular physical activity" },
          { needType: "Training", description: "Obedience training" },
        ],
      },
      {
        speciesType: "Cat",
        description: "Feline",
        image: "./images/cat.png",
        alt: "cute pixel cat",
        needs: [
          { needType: "Food", description: "Nutritious cat food" },
          {
            needType: "Grooming",
            description: "Regular brushing and grooming",
          },
          { needType: "Play", description: "Interactive playtime" },
        ],
      },
      {
        speciesType: "Ditto",
        description: "Transforming blob",
        image: "./images/ditto.png",
        alt: "cute pixel ditto",
        needs: [
          {
            needType: "Mimicry",
            description: "Ability to transform into other creatures",
          },
          {
            needType: "Adaptability",
            description: "Quickly adapting to new environments",
          },
          {
            needType: "Versatility",
            description: "Being versatile in different situations",
          },
        ],
      },
      {
        speciesType: "Dragon",
        description: "Mythical creature",
        image: "./images/dragon.png",
        alt: "cute pixel dragon",
        needs: [
          { needType: "Flight", description: "Ability to fly" },
          { needType: "Fire Breath", description: "Breathing fire" },
          {
            needType: "Treasure Hoarding",
            description: "Collecting and guarding treasure",
          },
        ],
      },
      {
        speciesType: "Slime",
        description: "Amorphous creature",
        image: "./images/slime.png",
        alt: "cute pixel slime",
        needs: [
          {
            needType: "Absorption",
            description: "Absorbing objects and materials",
          },
          {
            needType: "Splitting",
            description: "Ability to split into smaller slimes",
          },
          {
            needType: "Regeneration",
            description: "Regenerating lost body parts",
          },
        ],
      },
    ];
    // create an array of promises for creating species
    // map through the species data
    const speciesPromises = speciesData.map(async (species) => {
      // each species is created,  but wait for needs
      const createdSpecies = await Species.create({
        speciesType: species.speciesType,
        description: species.description,
        image: species.image,
        alt: species.alt,
      });

      // needs inserted into species obj
      const needs = await Need.insertMany(species.needs);

      // push into the species by need id (this was defined the resolvers)
      await Species.findByIdAndUpdate(createdSpecies._id, {
        // add it to the set using each newly createed id
        $addToSet: { needs: { $each: needs.map((need) => need._id) } },
      });
    });

    // wait until all promises in the species promises array is settled then execute
    await Promise.all(speciesPromises);

    // create pets for each sample user
    const petsData = [
      {
        name: "Buddy",
        age: 2,
        gender: "Male",
        species: "Dog",
        owner: user1._id,
      },
      {
        name: "Whiskers",
        age: 4,
        gender: "Female",
        species: "Cat",
        owner: user1._id,
      },
      {
        name: "Sparky",
        age: 3,
        gender: "Male",
        species: "Dog",
        owner: user2._id,
      },
      {
        name: "Fluffy",
        age: 5,
        gender: "Female",
        species: "Cat",
        owner: user2._id,
      },
    ];

    // defines a promise that waits for all the promises within the array is settled then execute
    const petsPromises = petsData.map(async (petData) => {
      const species = await Species.findOne({ speciesType: petData.species });

      const pet = await Pet.create({
        name: petData.name,
        age: petData.age,
        gender: petData.gender,
        species: species._id,
        owner: petData.owner,
      });

      await User.findByIdAndUpdate(petData.owner, { $push: { pets: pet._id } });
    });

    await Promise.all(petsPromises);
    // once completed seeding, it exits the node.js process
    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit();
  }
});
