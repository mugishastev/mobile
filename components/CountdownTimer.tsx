import { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

type CountdownTimerProps = {
  targetTime: Date;
};

export function CountdownTimer({ targetTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime(targetTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ends in:</Text>
      <Text style={styles.timer}>
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </Text>
    </View>
  );
}

function getRemainingTime(target: Date) {
  const now = new Date().getTime();
  const diff = Math.max(target.getTime() - now, 0);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  timer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e60000ff',
  },
});
