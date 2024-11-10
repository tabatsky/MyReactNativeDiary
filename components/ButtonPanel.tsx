import { View, Dimensions, FlatList } from "react-native";
import ColorButton from "./ColorButton";

function ButtonPanel({addEntry}: {addEntry: Function}): React.JSX.Element {
    const colors = [0, 1, 2, 3, 4, 5];
  
    const A = Dimensions.get('window').width / 7;
  
    return <FlatList
            horizontal
            style={{ height: A }}
            data={colors}
            renderItem={({item}) => {
              if (item < 5) {
                return <View
                    style={{ flexDirection: 'row' }}
                  >
                  <ColorButton A={A} color={item} addEntry={addEntry} />
                  <View
                    style={{ width: A / 5 }}
                  ></View>
                </View>
              } else {
                return <ColorButton A={A} color={item} addEntry={addEntry} />
              }}}
              keyExtractor={item => item.toString()}
          />
  }

  export default ButtonPanel;