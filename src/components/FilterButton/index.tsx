import React from 'react';
import { 
  TouchableFilter,
  TextFilter,
  IconFilter,
  NumberContainer,
  NumberText
 } from './styles';


interface Props {
  url: string;
  navigation: any;
}

export function FilterButton({ url,navigation }: Props) {
  return (

    <TouchableFilter
      onPress={() => navigation.navigate('WikiFilter')}
      hasFilter={url ? true : false}
    >
      <TextFilter
        hasFilter={url ? true : false}
      >Filtros</TextFilter>
      {url ? (
        <NumberContainer>
              <NumberText>{(url.split('=').length-1)}</NumberText>
        </NumberContainer>
      )

        : (<IconFilter name="filter-list" />)
      }
    </TouchableFilter>
  );
}