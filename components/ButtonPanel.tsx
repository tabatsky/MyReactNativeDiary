import { Dimensions, FlatList } from 'react-native';
import ColorButton from './ColorButton';
import React, { useState } from 'react';

function ButtonPanel({addEntry}: {addEntry: Function}): React.JSX.Element {
    const colors = [0, 1, 2, 3, 4, 5];

    const [A, setA] = useState(Dimensions.get('window').width / 7);
    const [isPortrait, setIsPortrait] =
        useState(Dimensions.get('window').width < Dimensions.get('window').height);
    const updateDimensions = () => {
        setA(Dimensions.get('window').width / 7);
        setIsPortrait(Dimensions.get('window').width < Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateDimensions);

    const hCoeff = isPortrait ? 1.0 : 0.2;
    return <FlatList
            horizontal
            style={{ height: A * hCoeff }}
            data={colors}
            renderItem={({item}) => (
                <ColorButton A={A} isPortrait={isPortrait} color={item} addEntry={addEntry} />
            )}
            keyExtractor={item => item.toString()}
          />;
  }

  export default ButtonPanel;
