import { guessResults } from './gameState.js';

const randomBirdFacts = [
  "The fastest bird is the peregrine falcon, which can dive at speeds over 240 mph (386 km/h).",
  "Owls can rotate their heads up to 270 degrees.",
  "Some birds, like the Arctic tern, migrate thousands of miles every year — up to 44,000 miles round trip.",
  "The smallest bird is the bee hummingbird, measuring about 2.2 inches (5.5 cm) long.",
  "Birds have hollow bones to make flight easier.",
  "The largest bird by height is the ostrich, which can reach up to 9 feet tall.",
  "Flamingos get their pink color from the carotenoid pigments in the algae and crustaceans they eat.",
  "Some birds, like crows and parrots, can mimic human speech.",
  "The albatross has the longest wingspan of any bird, reaching up to 11 feet (3.4 meters).",
  "Birds have a unique respiratory system with air sacs that allow for more efficient oxygen exchange.",
  "Penguins are birds that cannot fly but are excellent swimmers.",
  "The kiwi bird lays one of the largest eggs in relation to its body size.",
  "Male birds often sing to attract mates and defend territory.",
  "Some birds use tools, like the New Caledonian crow, which can create hooks from twigs to catch insects.",
  "The hoatzin chick has claws on its wings to help it climb trees.",
  "Birds have a four-chambered heart, just like mammals.",
  "Hummingbirds can hover in place by flapping their wings up to 80 times per second.",
  "Many bird species have excellent color vision, better than humans.",
  "The cassowary is considered one of the most dangerous birds due to its powerful legs and claws.",
  "Some birds, like woodpeckers, have shock-absorbing skulls to prevent brain injury from pecking.",
  "Birds' bones are fused in some places to provide rigidity during flight.",
  "The bald eagle is a symbol of the United States, but it was almost the turkey",
  "The male emperor penguin incubates the egg by balancing it on his feet under a flap of skin.",
  "Birds excrete uric acid instead of urine to conserve water.",
  "Birds can see ultraviolet light, which humans cannot.",
  "Some birds, like the common swift, can stay airborne for months at a time without landing.",
  "The largest egg of any living bird is laid by the ostrich.",
  "Birds have a specialized vocal organ called a syrinx that allows complex sounds.",
  "Birds molt their feathers regularly to maintain flight efficiency.",
  "The chickadee can remember hundreds of hiding spots for its food caches.",
  "Birds have a high metabolic rate to support flight.",
  "The secretary bird hunts snakes by stomping on them.",
  "The courtship dances of birds of paradise are among the most elaborate in the animal kingdom.",
  "Some birds, like the snowy owl, change color with the seasons for camouflage.",
  "The kiwi has nostrils at the tip of its beak, unlike most birds.",
  "Birds are descendants of theropod dinosaurs.",
  "The swallow can drink while flying by skimming water surfaces.",
  "Birds have no teeth; they swallow food whole or tear it with their beaks.",
  "The laughing kookaburra's call sounds like human laughter.",
  "Some birds, like pigeons, can find their way home from hundreds of miles away.",
  "The bar-tailed godwit holds the record for the longest nonstop migration flight.",
  "Birds use their feathers for insulation, waterproofing, and flight.",
  "The male peacock displays his colorful tail feathers to attract females.",
  "Birds have excellent spatial memory for nesting and feeding.",
  "The wood duck nests in tree cavities.",
  "The barn owl has asymmetrical ears to help locate prey by sound.",
  "Some birds participate in cooperative breeding, helping raise the offspring of others.",
  "The flamingo stands on one leg to conserve body heat."
];

export function generateShareText(guessesUsed) {
    let result = `Birdle Results: ${guessesUsed}/6\n\n`;
    guessResults.forEach(row => {
        result += row.join('') + '\n';
    });
    let randomBirdFact = randomBirdFacts[Math.floor(Math.random() * randomBirdFacts.length)]
    result += `\nEnjoy a fun bird fact: ${randomBirdFact}\n`
    result += "\nYou can play Birdle at https://nzoam93.github.io/birdle-revamped/"
    console.log(result)
    return result;
}
