import React, { Component } from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import Button from './src/components/Button'
import Display from './src/components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default class App extends Component {
  //setando todos os atributos dentro do objeto que representa o estado
  state = { ...initialState }

  addDigit = n => {

    //limpando quando o displayValue inicial for zero ou quando o atributo clearDisplay for verdadeiro
    const clearDisplay = this.state.displayValue === '0' 
      || this.state.clearDisplay

    //ponto só pode entrar uma vez na calculadora
    if( n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return
    }

    //setar o valor corrente, caso o clearDisplay for false
    const currentValue = clearDisplay ? '' : this.state.displayValue
    //concatenando os digitos
    const displayValue = currentValue + n
    //setando os valores
    this.setState({ displayValue, clearDisplay: false })

    if (n !== '.'){
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }
  }

  clearMemory = () => {
    //restaurar o estado inicial da calculadora
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    if (this.state.current === 0){
      //setar a operação recebida por parâmetro
      //apontar o array para o índice 1 (segundo elemento do array)
      //após setar a operação limpar o display
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        //pegando o valor 1, a operação e o valor 2 do array, retorna o resultado
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (e) {
        //caso o usuário digite 23 = 2 (operação inválida)
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`,
        //setar a operação para a próxima execução
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        //limpar o display dps do resultado
        clearDisplay: true,
        values,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={this.setOperation} />
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='*' operation onClick={this.setOperation}  />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' operation onClick={this.setOperation}  />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='+' operation onClick={this.setOperation}  />
          <Button label='0' double onClick={this.addDigit} />
          <Button label='.' onClick={this.addDigit} />
          <Button label='=' operation onClick={this.setOperation}  />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})