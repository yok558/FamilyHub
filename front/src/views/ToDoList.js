import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, ScrollView } from 'react-native';
import { Button, CheckBox, Overlay, Input, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { showModal, editInput, saveTask, checkTask, delTask, getFamilyToDo } from '../redux/actions/todoActions';

class ToDoList extends Component {
  state = {};

  componentDidMount() {
    this.familyToDoFetch();
  }

  async familyToDoFetch() {
    const someVariable = await this.props.getFamilyToDo(this.props.cookies);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 30 }}>
        <TouchableHighlight underlayColor="white">
          <ScrollView>
            {this.props.list.map((item, i) => (
              <View key={i} style={{ flex: 1, justifyContent: 'flex-end' }}>
                <CheckBox
                  key={item.id}
                  title={item.goal + ' id:' + item.id}
                  checked={item.active}
                  onIconPress={() => {
                    this.props.checkTask(item.goal, item.active, i, item.id, this.props.cookies);
                  }}
                  onLongPress={() => this.props.delTask(i)}
                  onPress={() => {
                    this.props.showModal(true, i);
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </TouchableHighlight>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Button onPress={() => this.props.showModal(true, -1)} title="Create new task" color="#841584" />
        </View>
        <View>
          <Overlay
            height="auto"
            isVisible={this.props.isVisibleNewTask}
            onBackdropPress={() => this.props.showModal(false, -1)}
          >
            <View>
              <Input autoFocus onChangeText={text => this.props.editInput(text)} value={this.props.newTaskTitle} />
              <Button onPress={() => this.props.saveTask()} title="Save task" />
            </View>
          </Overlay>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    list: state.ToDoList.list,
    newTaskTitle: state.ToDoList.newTaskTitle,
    isVisibleNewTask: state.ToDoList.isVisibleNewTask,
    editTaskID: state.ToDoList.editTaskID,
    cookies: state.User.cookies,
    curFamilyID: state.ToDoList.currentFamilyID,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showModal: (bool, i) => dispatch(showModal(bool, i)),
    editInput: text => dispatch(editInput(text)),
    saveTask: () => dispatch(saveTask()),
    checkTask: (title, checkedBool, i, id, cookie) => dispatch(checkTask(title,checkedBool, i, id, cookie)),
    delTask: i => dispatch(delTask(i)),
    getFamilyToDo: cookie => dispatch(getFamilyToDo(cookie)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDoList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});