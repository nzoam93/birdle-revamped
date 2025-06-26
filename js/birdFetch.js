export async function fetchBirdImage(birdName) {
  const response = await fetch(`https://api.inaturalist.org/v1/search?q=${encodeURIComponent(birdName)}&sources=taxa&taxon_id=3`);
  const data = await response.json();
  // console.log(data)
  // const bird = data.results?.find(result => result.record?.default_photo && result.record?.iconic_taxon_name === "Aves");
  const bird = data.results?.find(result => {
    const record = result.record;
    return (
      record?.default_photo &&
      record?.iconic_taxon_name === "Aves" &&
      record?.rank === "species"
    );
  });
  return bird?.record?.default_photo?.medium_url || './imgs/fallback-image.jpeg';
}

export async function fetchBirdFact(birdName){
  const formattedName = birdName
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(formattedName)}`)
  const data = await response.json();
  let birdFact = data.extract || "Benjamin Franklink advocated for the turkey to be the national bird of the United States, and it only narrowly lost to the bald eagle.";
  if (birdFact.split(" ").length < 20){
    birdFact = "Benjamin Franklink advocated for the turkey to be the national bird of the United States, and it only narrowly lost to the bald eagle.";
  }
  return birdFact;
}


// bird sounds
// let birdAudio = null;

// export async function preloadBirdSound(birdName) {
//   try {
//     const res = await fetch(`https://node-proxy-for-birdle.onrender.com/bird-sound?bird=${birdName}`);

//     const data = await res.json();
//     if (!data || !data.url) {
//       throw new Error('Invalid audio response');
//     }

//     birdAudio = new Audio(data.url);
//     birdAudio.load();

//     //unhide the button once loaded
//     document.getElementById("playBirdSound").style.display = "block";
//   } catch (err) {
//     console.warn(`Preloading of audio failed for "${birdName}":`, err.message);
//     // Fall back to a default chirp:
//     birdAudio = new Audio("./audio/default-sound.m4a");
//     birdAudio.load();
//   }
// }

// export function playPreloadedBirdSound() {
//   console.log(birdAudio)
//   if (birdAudio) {
//     birdAudio.currentTime = 0.2; //starts it 0.2 seconds in
//     birdAudio.play();
//     setTimeout(() => {
//       birdAudio.pause();
//       birdAudio.currentTime = 0.2;
//     }, 3000);
//   }
// }

let birdAudio = null;
const birdCallButton = document.getElementById("playBirdSound");
const label = birdCallButton.querySelector(".label");
const progressBar = birdCallButton.querySelector(".progress-bar");

export async function preloadBirdSound(birdName) {
  // Reset button
  birdCallButton.classList.remove("ready");
  label.textContent = "Loading Bird Call...";
  birdCallButton.setAttribute("disabled", true);
  progressBar.style.width = "0%";
  progressBar.style.display = "block";

  // Trigger animation
  setTimeout(() => {
    progressBar.style.transition = "width 7s linear";
    progressBar.style.width = "100%";
  }, 50); // slight delay to ensure transition applies

  birdCallButton.classList.add("visible");

  try {
    const res = await fetch(`https://node-proxy-for-birdle.onrender.com/bird-sound?bird=${birdName}`);
    const data = await res.json();
    if (!data || !data.url) throw new Error("No audio found");

    birdAudio = new Audio(data.url);
    birdAudio.load();

    // Wait 7 seconds (animation time), then enable
    setTimeout(() => {
      birdCallButton.classList.add("ready");
      label.textContent = "Play Bird Call 📢";
      birdCallButton.removeAttribute("disabled");
      progressBar.style.display = "none";
    }, 7000);

  } catch (err) {
    console.warn("Bird sound failed:", err);
    birdAudio = new Audio("./audio/default-sound.m4a");
    birdAudio.load();
    label.textContent = "Play Bird Sound 🔊";
    birdCallButton.classList.add("ready");
    birdCallButton.removeAttribute("disabled");
    progressBar.style.display = "none";
  }
}

birdCallButton.addEventListener("click", () => {
  if (birdAudio) {
    birdAudio.currentTime = 0.2;
    birdAudio.play();
    setTimeout(() => {
      birdAudio.pause();
      birdAudio.currentTime = 0.2;
    }, 5000);
  }
});
