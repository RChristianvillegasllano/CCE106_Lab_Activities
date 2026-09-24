import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Logo({ scale = 1 }: { scale?: number }) {
  return (
    <View style={[styles.container, { transform: [{ scale }] }]}>
      <View style={styles.box}>
        <View style={styles.circle} />
        <Text style={styles.logoText}>black.</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerTextLeft}>#000000</Text>
        <View style={styles.footerTextRightContainer}>
          <Text style={styles.footerTextRight}>ESTD. 2026</Text>
          <Text style={styles.footerTextRight}>LOCATED IN</Text>
          <Text style={styles.footerTextRight}>TAGUM</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    alignSelf: 'center',
  },
  box: {
    width: 200,
    height: 200,
    borderWidth: 5,
    borderColor: '#fff',
    position: 'relative',
    padding: 12,
    justifyContent: 'flex-end',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 12,
    right: 12,
  },
  logoText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -2,
    lineHeight: 50,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  footerTextLeft: {
    color: '#fff',
    fontSize: 8,
    letterSpacing: 1,
  },
  footerTextRightContainer: {
    alignItems: 'flex-end',
  },
  footerTextRight: {
    color: '#fff',
    fontSize: 8,
    letterSpacing: 1,
    lineHeight: 10,
    textAlign: 'right',
  }
});
