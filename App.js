import React, {useState} from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import Header from './components/header.js';
import TodoItem from './components/todoItem'
import AddTodo from './components/addTodo.js'

export  default function App() {

  const initialState = []
  const [todos, setTodos] = useState(initialState);
  const [filter, setFilter] = useState('active')

  const pressHandler = (key) =>{
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (key === todo.key) {
            return {
                ...todo,
                active: false
            }
        } else {
            return {...todo}
        }
      })
    })};

  
  const submitHandler = async(text) => {
    let result = []
    setTodos((prevTodos) => {
      
      const key=prevTodos.length+1
       result = [
        { text, key: key.toString(), active: true},
        ...prevTodos
      ];

      
      return result
    })
   

  }

  const filterData = (todos) => {
    let result = []
    for (let index = 0; index < todos.length; index++) {
      if (filter === 'active' && todos[index].active ) { 
        result.push({...todos[index]}) 
      } else if (filter === 'inactive' && !todos[index].active){
        result.push({...todos[index]})
      } 
      if (filter === 'all') {
        result.push({...todos[index]})
      }
    }
    return result
  }
  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.content}>
        
          {/*<ScrollView style={styles.list}>*/}
          <FlatList
          ListHeaderComponent = {
            <>
            <AddTodo submitHandler={submitHandler}/>
            <Button onPress={() => setFilter('active')} title='filter-active' color='coral'/>
            <Button onPress={() => setFilter('inactive')} title='filter-inactive' color='coral'/>
            <Button onPress={() => setFilter('all')} title='filter-all' color='coral'/>
            <Button onPress={() => setTodos({})} title='reset' color='coral'/>
            </>
          }
          data={filterData(todos)}
          renderItem={({ item }  ) => (
           
            <TodoItem item={item} pressHandler={pressHandler}/> 
            
            
          )}
         
          />
          
        {/*</ScrollView>*/}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    height: '50%',
    marginTop: 20,
  }
});
