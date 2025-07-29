import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { CheckCircle, Circle } from 'lucide-react-native';

type Props = {
  checked: boolean;
  onToggle: () => void;
};

export const AnimatedCheckbox: React.FC<Props> = ({ checked, onToggle }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = 0.8; // squish
    scale.value = withSpring(
      1.2,
      {
        damping: 4,
        stiffness: 200,
        mass: 0.3,
      },
      () => {
        scale.value = withSpring(1);
      },
    );
  }, [checked]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.8}>
      <Animated.View style={animatedStyle}>
        {checked ? (
          <CheckCircle size={26} color="#5e17eb" />
        ) : (
          <Circle size={26} color="#c4c4c4" />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};
