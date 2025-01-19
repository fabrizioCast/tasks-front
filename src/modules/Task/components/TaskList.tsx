import { AppTheme, BORDER_RADIUS } from "@/src/config/theme";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, TouchableHighlight } from "react-native";
import { DataTable, IconButton, Text, Chip, useTheme, TouchableRipple } from "react-native-paper";
import { TaskProps, TaskStatus } from "../interface/Task";

const ITEMS_PER_PAGE = 10;

interface TaskListProps {
  tasks: TaskProps[];
  tasksPerPage?: number;
  handleDelete: (task: TaskProps) => void;
  handleTask: (task: TaskProps | null) => void;
}

const TaskList = ({ tasks, handleDelete, handleTask, tasksPerPage = ITEMS_PER_PAGE }: TaskListProps) => {
  const [page, setPage] = useState(0);

  const { colors } = useTheme<AppTheme>();

  const height = Dimensions.get("window").height;

  const from = page * tasksPerPage;
  const to = Math.min((page + 1) * tasksPerPage, tasks.length);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return { backgroundColor: colors.success };
      case TaskStatus.IN_PROGRESS:
        return { backgroundColor: colors.primary };
      case TaskStatus.PENDING:
        return { backgroundColor: colors.warning };
      default:
        return {};
    }
  };

  return (
    <View>
      <ScrollView style={{ maxHeight: height * 0.6 }}>
        <View style={styles.taskWrapper}>
          {tasks.slice(from, to).map((task) => (
            <View key={task.id}>
              <TouchableHighlight onPress={() => handleTask(task)} underlayColor="#dbdbdb">
                <View style={styles.taskItem}>
                  <View style={styles.taskItemHeader}>
                    <View>
                      <Text style={styles.taskItemTitle}>{task.title}</Text>
                      {task.description && <Text>{task.description}</Text>}
                      <Text>Fecha: {new Date(task.createdAt).toLocaleDateString()}</Text>
                    </View>
                    <IconButton icon="delete" iconColor={colors.error} onPress={() => handleDelete(task)} />
                  </View>
                  <Chip style={[styles.taskItemStatus, getStatusStyle(task.status)]} textStyle={{ color: "#fff" }}>
                    {task.status}
                  </Chip>
                </View>
              </TouchableHighlight>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.pagination}>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(tasks.length / ITEMS_PER_PAGE)}
          onPageChange={(newPage) => setPage(newPage)}
          label={`${from + 1}-${to} de ${tasks.length}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    margin: 8,
    flexDirection: "column",
    gap: 16,
  },
  taskItem: {
    borderRadius: BORDER_RADIUS,
    padding: 16,
    backgroundColor: "#fff",
    boxShadow: "2px 1px 5px 0px rgba(0,0,0,0.15)",
    paddingVertical: 18,
  },
  taskItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskItemTitle: {
    fontFamily: "bold",
    fontSize: 16,
    lineHeight: 18,
  },
  taskItemStatus: {
    fontFamily: "bold",
    fontSize: 14,
    lineHeight: 16,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 16,
  },
});

export default TaskList;
