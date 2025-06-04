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

// async function isBirdReal(birdName) {
//   const response = await fetch(`https://api.inaturalist.org/v1/search?q=${birdName}&sources=taxa`);
//   const data = await response.json();
//   const bird = data.results?.find(result => result.record?.default_photo);
//   return bird
// }

// async function checkBirdImages(completeBirdWords) {
//   const missingImages = [];

//   for (const bird of completeBirdWords) {
//     const imageUrl = await isBirdReal(bird);
//     if (!imageUrl) {
//       console.warn(`No image found for: ${bird}`);
//       missingImages.push(bird);
//     }
//   }

//   console.log("Birds with missing images:", missingImages);
//   return missingImages;
// }

// checkBirdImages(birdWords)
