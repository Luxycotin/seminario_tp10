const bands = [
  { name: 'Nirvana', genres: [1, 0, 0, 0, 0, 0] },     // Grunge
  { name: 'Radiohead', genres: [0, 1, 0, 0, 0, 0] },   // Alternativo
  { name: 'Nine Inch Nails', genres: [0, 0, 1, 0, 0, 0] }, // Industrial
  { name: 'Pearl Jam', genres: [1, 0, 0, 0, 0, 0] },   // Grunge
  { name: 'Muse', genres: [0, 1, 0, 1, 0, 0] },        // Alternativo, Progresivo
  { name: 'Tool', genres: [0, 0, 0, 1, 0, 0] },        // Progresivo
  { name: 'Slipknot', genres: [0, 0, 0, 0, 1, 0] },    // Metal
];

const genres = ['Grunge', 'Alternativo', 'Industrial', 'Progresivo', 'Metal', 'Pop'];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('bandsContainer');
  bands.forEach((band, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <label>${band.name}: 
        <input type="number" min="0" max="10" name="rating${index}" required />
      </label>
    `;
    container.appendChild(div);
  });

  document.getElementById('ratingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const userRatings = bands.map((_, i) =>
      parseFloat(document.querySelector(`[name=rating${i}]`).value)
    );
    processRatings(userRatings);
  });
});

function processRatings(userRatings) {
  const userVotesTensor = tf.tensor2d([userRatings], [1, bands.length]);
  const bandFeatures = tf.tensor2d(bands.map(b => b.genres));
  const userFeatures = tf.matMul(userVotesTensor, bandFeatures);
  const topGenres = tf.topk(userFeatures, genres.length);
  
  const resultList = document.getElementById('resultList');
  resultList.innerHTML = '';
  
  topGenres.indices.data().then(indices => {
    indices.forEach(i => {
      const li = document.createElement('li');
      li.textContent = genres[i];
      resultList.appendChild(li);
    });
  });
}
