import {Rating} from 'react-native-ratings';

const DefaultRating = ({
  showRating,
  ratingCount,
  readonly,
  startingValue,
  onFinishRating,
  fractions,
  style,
} = props) => {
  return (
    <Rating
      showRating={showRating}
      ratingCount={ratingCount || 5}
      readonly={readonly}
      startingValue={startingValue || 5}
      onFinishRating={onFinishRating}
      fractions={fractions || 0}
      style={[style]}
    />
  );
};

export default DefaultRating;
