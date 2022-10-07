import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import {useKeepAwake} from 'expo-keep-awake'
import { Countdown } from '../component/Countdown';
import { Timing } from './Timing';
import { RoundedButton } from '../component/RoundedButton';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const ONE_SECONDE_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECONDE_IN_MS,
  1 * ONE_SECONDE_IN_MS,
  1 * ONE_SECONDE_IN_MS,
];

export const Timer = ({ focusSubject , clearSubject ,onTimerEnd }) => {
  useKeepAwake()
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.2);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN)
    setIsStarted(false)
    setProgress(1)
    reset()
    onTimerEnd(focusSubject)
    clearSubject()
  }

  return (
    <View style={styles.container}>
      <View style={styles.Countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on : </Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.progressBar}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.wrapperButton}>
        {!isStarted && (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrpper}>
        <RoundedButton title="-" size={50} onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperButton: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.md,
    flexDirection: 'row',
  },
  clearSubjectWrpper : {
    flexDirection : 'row',
    justifyContent : 'center'
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
});
