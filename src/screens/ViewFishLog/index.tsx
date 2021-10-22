import React, { useState, useEffect, FC } from 'react';

import { ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FishContainer,
  PropertyRow,
  DescriptionContainer,
  RegisterButtonView,
} from './styles';

import { Property } from '../../components/Property';
import { Title } from '../../components/Title';
import { HalfToneText } from '../../components/HalfToneText';
import { ProfileImage } from '../../components/ProfileImage';
import { MapViewImage } from '../../components/MapViewImage';
import { DefaultButton } from '../../components/Button';

import { GetOneFishLog } from '../../services/fishLogService/getOneFishLog';

export const FishLog = ({ route }: any) => {
  const [fishName, setFishName] = useState();
  const [fishPhoto, setFishPhoto] = useState<string>();
  const [fishLargeGroup, setFishLargeGroup] = useState();
  const [fishGroup, setFishGroup] = useState();
  const [fishSpecies, setFishSpecies] = useState();
  const [fishWeight, setFishWeight] = useState();
  const [fishLength, setFishLength] = useState();
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const userAdmin = await AsyncStorage.getItem('@eupescador/userAdmin');
    const token = await AsyncStorage.getItem('@eupescador/token');
    if (token) getFishLogProperties(token);
    if (userAdmin === 'true') setIsAdmin(true);
    else setIsAdmin(false);
  };

  const getFishLogProperties = async (token: string) => {
    try {
      const { log_id } = route.params;
      const log = await GetOneFishLog(log_id, token);
      const base64Img = `data:image/png;base64,${log.photo}`;
      if (log.photo) setFishPhoto(base64Img);
      setFishName(log.name);
      setFishSpecies(log.species);
      setFishLargeGroup(log.largeGroup);
      setFishGroup(log.group);
      setFishWeight(log.weight);
      setFishLength(log.length);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <FishContainer>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <ProfileImage
            source={
              fishPhoto
                ? { uri: fishPhoto }
                : require('../../assets/fishIcon.png')
            }
          />

          <DescriptionContainer>
            <Title text={fishName || 'Nome não informado'} />
            <HalfToneText text={fishSpecies || 'Espécie não informado'} />
          </DescriptionContainer>

          <PropertyRow>
            <Property
              property="Grande Grupo"
              value={
                fishLargeGroup
                  ? JSON.stringify(fishLargeGroup)
                  : 'Não informado'
              }
            />

            <Property
              property="Grupo"
              value={fishGroup ? JSON.stringify(fishGroup) : 'Não informado'}
            />
          </PropertyRow>

          <PropertyRow>
            <Property
              property="Tamanho(cm)"
              value={fishLength ? JSON.stringify(fishLength) : 'Não informado'}
            />

            <Property
              property="Peso(kg)"
              value={fishWeight ? JSON.stringify(fishWeight) : 'Não informado'}
            />
          </PropertyRow>

          <MapViewImage source={require('../../assets/map.png')} />

          <RegisterButtonView>
            {isAdmin ? (
              <>
                <DefaultButton text="Revisar" buttonFunction={() => { }} />
                <DefaultButton text="Exportar" buttonFunction={() => { }} />
              </>
            ) : (
              <DefaultButton text="Editar" buttonFunction={() => { }} />
            )}

            <DefaultButton text="Excluir" buttonFunction={() => { }} />
          </RegisterButtonView>
        </ScrollView>
      )}
    </FishContainer>
  );
};
