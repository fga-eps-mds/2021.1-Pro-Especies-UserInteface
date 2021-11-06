import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import CheckBox from '@react-native-community/checkbox';
import {
  ButtonView,
  Container,
  ExportButton,
  ExportButtonText,
  LeftContainer,
  FilterContainer,
  DownloadIcon,
  FilterIcon,
  AddLogButton,
  AddIcon,
  AddLogView,
  AddButtonView,
  TouchableTitle,
  TitleText,
  OptionsView,
  NotLoggedText,
  FishCardList,
  ExportAllView,
  ExportAllText,
  CancelButtonText,
  ExportSelectedView,
  ExportSelectedButton,
  ExportSelectedButtonView,
  DownloadIconBottom,
  ExportSelectedText,
} from './styles';
import { GetAllFishLogs } from '../../services/fishLogService/getAllLogs';
import { ExportFishLogs } from '../../services/fishLogService/exportFishLogs';
import { FishCard, IFishLog } from '../FishCard';


interface Props {
  token: string;
  isAdmin: boolean;
}

export const FishLogs = ({ token, isAdmin }: Props) => {
  const [fishLog, setFishLog] = useState<IFishLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [exportList, setExportList] = useState<string[]>([]);
  const [isCheck, setIsCheck] = useState(false);
  const [isExportMode, setIsExportMode] = useState(false);
  const navigation = useNavigation();


  const getFishLogs = async () => {
    try {
      const data = await GetAllFishLogs(token);

      setFishLog(data);
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleNavigation = (id: string) => {
    navigation.navigate(
      'FishLog' as never,
      {
        log_id: id,
      } as never,
    );
  };

  const selectAllFunction = (value: boolean) => {
    setIsCheck(value);
    if (value) {
      fishLog.forEach((item) => {
        if (!exportList.includes(item._id)) {
          setExportList(arr => [...arr, item._id]);
        }
      });
    } else {
      setExportList([""]);
    }
  };

  const handleExport = async () => {
    setIsExportMode(!isExportMode);
  };

  const handleAddLog = async () => {
    navigation.navigate("NewFishLog" as never, {
      isNewRegister: true,
      name: "Novo Registro",
    } as never);
  };


  const saveFile = async (csvFile: string) => {
    try {
      const res = await MediaLibrary.requestPermissionsAsync()

      if (res.granted) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + "-" + today.getMinutes();

        let fileUri = FileSystem.documentDirectory + `registros-${date}.csv`;
        await FileSystem.writeAsStringAsync(fileUri, csvFile);
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync("euPescador", asset, false);

        handleExport();
        Alert.alert("Exportar Registros", "Registros exportados com sucesso", [
          {
            text: "Ok",
          }
        ])
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleExportSelected = async () => {
    try {
      const file = await ExportFishLogs(token, exportList);
      saveFile(file);
    } catch (error: any) {
      console.log(error);
    }
  };


  const addExportList = (logId: string) => {
    setExportList(arr => [...arr, logId]);
  };

  const removeExportList = (logId: string) => {
    setExportList(exportList.filter(item => item !== logId));
  };

  useEffect(() => {
    getFishLogs();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <OptionsView>
            <TouchableTitle onPress={() => { }}>
              <TitleText>Filtros</TitleText>
              <FilterIcon name="filter-list" />
            </TouchableTitle>
            {
              isAdmin ? (
                <ButtonView>
                  <ExportButton onPress={handleExport}>
                    {
                      isExportMode ? <>
                        <DownloadIcon name="cancel" />
                        <CancelButtonText >Cancelar</CancelButtonText>
                      </>

                        :
                        <>
                          <DownloadIcon name="file-download" />
                          <ExportButtonText>Exportar Registros</ExportButtonText>
                        </>

                    }
                  </ExportButton>
                </ButtonView>
              ) : null
            }
          </OptionsView>
          <ExportAllView>

            {
              isExportMode ? <>
                <CheckBox value={isCheck} onValueChange={selectAllFunction} />
                <ExportAllText>Selecionar todos os registros</ExportAllText>
              </>
                : null
            }
          </ExportAllView>
          <FishCardList
            data={fishLog}
            renderItem={({ item }) => (
              <FishCard
                selectAll={isCheck}
                fishLog={item}
                isHidden={!isExportMode}
                cardFunction={() => {
                  handleNavigation(item._id);
                }}
                selectFunction={() => {
                  addExportList(item._id);
                }}
                deselectFunction={() => {
                  removeExportList(item._id);
                }}
              />
            )}
            keyExtractor={item => item._id}
          />
          {isExportMode ?
            <ExportSelectedView>
              <ExportSelectedButton onPress={() => {
                Alert.alert("Exportar Registros", "Você deseja exportar esses registros?", [
                  {
                    text: "Cancelar",
                    style: "cancel"
                  },
                  {
                    text: "Ok",
                    onPress: () => handleExportSelected()
                  }
                ])
              }
              }>
                <ExportSelectedButtonView>
                  <ExportSelectedText>Exportar Selecionados</ExportSelectedText>
                  <DownloadIconBottom name="file-download" />
                </ExportSelectedButtonView>
              </ExportSelectedButton>
            </ExportSelectedView>
            : <AddButtonView>
              <AddLogButton onPress={handleAddLog}>
                <AddLogView>
                  <AddIcon name="add" />
                </AddLogView>
              </AddLogButton>
            </AddButtonView>
          }
        </>
      )}
    </Container>
  );
};
