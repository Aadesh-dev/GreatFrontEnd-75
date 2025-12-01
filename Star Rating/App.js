import StarRating from './StarRating';

export default function App() {
  return (
    <div>
      <StarRating maxStars={5} initialRating={3} />
      <StarRating maxStars={7} initialRating={2} readOnly />
    </div>
  );
}
