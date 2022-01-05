# Bienvenido al Frontend
* Instalacion
  ```
  cd Liion
  yarn install or npm install
  ```
* Forma de ejecución
  ```
  cd Liion
  yarn start or yarn android or expo start or expo start -c or expo r -c
  ```

  /******DATO**********
   * Como se deberia llamar funciones en event handlers como botones
   * Notice how with onClick={() => console.log('click')},
   *  we’re passing a function as the onClick prop.
   * React will only call this function after a click.
   * Forgetting () => and writing onClick={console.log('click')} is a common mistake,
   * and would fire every time the component re-renders.
   * REF:  https://reactjs.org/tutorial/tutorial.html   Primera 'Note'
   ******************/


   * Forma de ocupar el modalUp disponibles 
   * 
import ModalPopUp from "../../components/ModalPopUp";
const [modalVisible, setModalVisible] = useState(false);
<ModalPopUp visible={modalVisible} setModalVisible={setModalVisible}>
  No disponible compadre, me entendiste chonchetumare?
</ModalPopUp>
   * 