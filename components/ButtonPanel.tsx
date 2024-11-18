import { View, Dimensions, FlatList } from "react-native";
import ColorButton from "./ColorButton";
import React, { useEffect, useState } from "react";

function ButtonPanel({addEntry}: {addEntry: Function}): React.JSX.Element {
    const colors = [0, 1, 2, 3, 4, 5];

    const [A, setA] = useState(Dimensions.get('window').width / 7);
    const updateA = () => {
        setA(Dimensions.get('window').width / 7);
    };
    Dimensions.addEventListener('change', updateA);

    return <FlatList
            horizontal
            style={{ height: A }}
            data={colors}
            renderItem={({item}) => (
                <ColorButton A={A} color={item} addEntry={addEntry} />
            )}
            keyExtractor={item => item.toString()}
          />
  }

  export default ButtonPanel;