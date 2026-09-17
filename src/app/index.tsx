import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Status = "Present" | "Absent";

type Attendance = {
  id: number;
  date: string;
  location: string;
  time: string;
  status: Status;
};

const initialAttendance: Attendance[] = [
  {
    id: 1,
    date: "13th May, 2025",
    location: "John Doe",
    time: "7:30AM - 3:00PM",
    status: "Present",
  },
  {
    id: 2,
    date: "12th May, 2025",
    location: "Jane Doe",
    time: "7:30AM - 3:00PM",
    status: "Present",
  },
  {
    id: 3,
    date: "11th May, 2025",
    location: "Juan Luna",
    time: "7:30AM - 3:00PM",
    status: "Present",
  },
  {
    id: 4,
    date: "10th May, 2025",
    location: "Crisostoma Ibarra",
    time: "7:30AM - 3:00PM",
    status: "Absent",
  },
  {
    id: 5,
    date: "9th May, 2025",
    location: "Macia Clara",
    time: "7:30AM - 3:00PM",
    status: "Absent",
  },
];

export default function Lab08() {
  const [attendance, setAttendance] =
    useState<Attendance[]>([]);

  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState("09:00am");

  // Required useEffect
  useEffect(() => {
    setAttendance(initialAttendance);
  }, []);

  // Change Present / Absent
  const changeStatus = (id: number, status: Status) => {
    setAttendance((currentAttendance) =>
      currentAttendance.map((item) =>
        item.id === id
          ? { ...item, status: status }
          : item
      )
    );
  };

  // Clock In
  const handleClockIn = () => {
    const now = new Date();

    let hours = now.getHours();
    const minutes = now.getMinutes();

    const ampm = hours >= 12 ? "pm" : "am";

    if (hours > 12) {
      hours -= 12;
    }

    if (hours === 0) {
      hours = 12;
    }

    const formattedTime =
      `${hours}:` +
      `${minutes < 10 ? "0" : ""}${minutes}` +
      `${ampm}`;

    setClockInTime(formattedTime);
    setClockedIn(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Attendance
          </Text>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="search-outline"
                size={25}
                color="#222"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="notifications-outline"
                size={25}
                color="#222"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Track check-ins and work
              {"\n"}
              hours with ease
            </Text>

            <TouchableOpacity
              style={[
                styles.clockButton,
                clockedIn && styles.clockedButton,
              ]}
              onPress={handleClockIn}
            >
              <Ionicons
                name="stopwatch-outline"
                size={19}
                color="#FFFFFF"
              />

              <Text style={styles.clockButtonText}>
                {clockedIn ? "Clocked In" : "Clock In"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* CLOCK */}
          <View style={styles.clockArea}>
            <View style={styles.clock}>
              <View style={styles.clockFace}>
                <View style={styles.handOne} />
                <View style={styles.handTwo} />
                <View style={styles.clockDot} />

                <Text style={styles.clock12}>12</Text>
                <Text style={styles.clock3}>3</Text>
                <Text style={styles.clock6}>6</Text>
                <Text style={styles.clock9}>9</Text>
              </View>
            </View>
          </View>
        </View>

        {/* TIME SUMMARY */}
        <View style={styles.timeCard}>
          <View style={styles.timeColumn}>
            <Text style={styles.timeLabel}>
              Clock In Time
            </Text>

            <Text style={styles.timeValue}>
              {clockInTime}
            </Text>
          </View>

          <View style={styles.timeColumn}>
            <Text style={styles.timeLabel}>
              Break Time
            </Text>

            <Text style={styles.timeValue}>
              12:00pm
            </Text>
          </View>

          <View style={styles.timeColumn}>
            <Text style={styles.timeLabel}>
              Clock Out Time
            </Text>

            <Text style={styles.timeValue}>
              05:00pm
            </Text>
          </View>
        </View>

        {/* HISTORY HEADER */}
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>
            Attendance History
          </Text>

          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>
              See All
            </Text>

            <Ionicons
              name="chevron-forward"
              size={17}
              color="#222"
            />
          </TouchableOpacity>
        </View>

        {/* ATTENDANCE LIST */}
        {attendance.map((item) => (
          <View
            key={item.id}
            style={styles.attendanceItem}
          >
            {/* ICON */}
            <View style={styles.attendanceIcon}>
              <Ionicons
                name="stopwatch-outline"
                size={23}
                color="#4169E1"
              />
            </View>

            {/* DATE + TIME */}
            <View style={styles.attendanceInfo}>
              <Text style={styles.dateText}>
                {item.date}
              </Text>

              <Text style={styles.workTime}>
                {item.time}
              </Text>

              {/* BUTTONS */}
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    item.status === "Present" &&
                      styles.presentButton,
                  ]}
                  onPress={() =>
                    changeStatus(item.id, "Present")
                  }
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      item.status === "Present" &&
                        styles.presentButtonText,
                    ]}
                  >
                    Present
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    item.status === "Absent" &&
                      styles.absentButton,
                  ]}
                  onPress={() =>
                    changeStatus(item.id, "Absent")
                  }
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      item.status === "Absent" &&
                        styles.absentButtonText,
                    ]}
                  >
                    Absent
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* LOCATION + DYNAMIC STATUS */}
            <View style={styles.rightInfo}>
              <Text style={styles.locationText}>
                {item.location}
              </Text>

              {/* THIS CHANGES WHEN BUTTON IS PRESSED */}
              <View
                style={[
                  styles.statusBadge,
                  item.status === "Present"
                    ? styles.presentBadge
                    : styles.absentBadge,
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    item.status === "Present"
                      ? styles.presentDot
                      : styles.absentDot,
                  ]}
                />

                <Text
                  style={[
                    styles.badgeText,
                    item.status === "Present"
                      ? styles.presentText
                      : styles.absentText,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },

  /* HEADER */

  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "#202020",
  },

  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },

  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  /* HERO */

  hero: {
    height: 220,
    backgroundColor: "#F4F8FF",
    borderRadius: 12,
    overflow: "hidden",
    flexDirection: "row",
  },

  heroContent: {
    flex: 1,
    paddingTop: 28,
    paddingLeft: 18,
    zIndex: 2,
  },

  heroTitle: {
    fontSize: 19,
    lineHeight: 27,
    color: "#555A64",
    fontWeight: "500",
  },

  clockButton: {
    marginTop: 25,
    height: 50,
    paddingHorizontal: 18,
    borderRadius: 26,
    backgroundColor: "#4169E1",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
  },

  clockedButton: {
    backgroundColor: "#3154C6",
  },

  clockButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  /* CLOCK */

  clockArea: {
    width: 170,
    justifyContent: "center",
    alignItems: "center",
  },

  clock: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 4,
    borderColor: "#202020",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  clockFace: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: "#333",
    position: "relative",
  },

  clock12: {
    position: "absolute",
    top: 3,
    left: 37,
    fontSize: 10,
    fontWeight: "600",
  },

  clock3: {
    position: "absolute",
    right: 4,
    top: 37,
    fontSize: 10,
    fontWeight: "600",
  },

  clock6: {
    position: "absolute",
    bottom: 3,
    left: 39,
    fontSize: 10,
    fontWeight: "600",
  },

  clock9: {
    position: "absolute",
    left: 4,
    top: 37,
    fontSize: 10,
    fontWeight: "600",
  },

  handOne: {
    position: "absolute",
    width: 3,
    height: 28,
    backgroundColor: "#222",
    left: 42,
    top: 28,
    transform: [{ rotate: "-45deg" }],
    borderRadius: 3,
  },

  handTwo: {
    position: "absolute",
    width: 3,
    height: 34,
    backgroundColor: "#222",
    left: 42,
    top: 20,
    transform: [{ rotate: "45deg" }],
    borderRadius: 3,
  },

  clockDot: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#222",
    left: 39,
    top: 39,
  },

  /* TIME CARD */

  timeCard: {
    minHeight: 92,
    marginTop: 17,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  timeColumn: {
    flex: 1,
    paddingHorizontal: 8,
  },

  timeLabel: {
    fontSize: 13,
    color: "#555A64",
    marginBottom: 8,
  },

  timeValue: {
    fontSize: 19,
    color: "#202020",
    fontWeight: "500",
  },

  /* HISTORY */

  historyHeader: {
    marginTop: 28,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  historyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#202020",
  },

  seeAllButton: {
    height: 42,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    borderRadius: 22,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  seeAllText: {
    fontSize: 14,
    color: "#333",
  },

  /* ATTENDANCE */

  attendanceItem: {
    minHeight: 105,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  attendanceIcon: {
    width: 52,
    height: 52,
    borderRadius: 27,
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  attendanceInfo: {
    flex: 1,
    minWidth: 0,
  },

  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#202020",
    marginBottom: 5,
  },

  workTime: {
    fontSize: 13,
    color: "#929292",
  },

  buttonsRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 6,
  },

  statusButton: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#FFFFFF",
  },

  statusButtonText: {
    fontSize: 10,
    color: "#777777",
    fontWeight: "600",
  },

  presentButton: {
    backgroundColor: "#E9F8F1",
    borderColor: "#72D5A6",
  },

  presentButtonText: {
    color: "#168A58",
  },

  absentButton: {
    backgroundColor: "#FFF1E5",
    borderColor: "#F0B47B",
  },

  absentButtonText: {
    color: "#D66F18",
  },

  /* RIGHT SIDE */

  rightInfo: {
    width: 120,
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 8,
  },

  locationText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#202020",
    marginBottom: 8,
    textAlign: "right",
  },

  /* DYNAMIC BADGE */

  statusBadge: {
    minWidth: 78,
    height: 29,
    paddingHorizontal: 9,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  presentBadge: {
    backgroundColor: "#E5F8EF",
  },

  absentBadge: {
    backgroundColor: "#CD5C5C",
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  presentDot: {
    backgroundColor: "#25A96F",
  },

  absentDot: {
    backgroundColor: "#8B0000",
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  presentText: {
    color: "#249A68",
  },

  absentText: {
    color: "#FBCEB1",
  },
});