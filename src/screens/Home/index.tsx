import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation()

  const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  useEffect(() => {
    fetch('http://192.168.56.1:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg}
          style={styles.logo} />

        <Heading title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...' />

        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={item => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameCard
              onPress={() => handleOpenGame(item)}
              data={item}
            />
          )}
        />
      </SafeAreaView>
    </Background>
  );
}