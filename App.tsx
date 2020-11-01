import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";
// @ts-ignore
import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Attestation {
  firstname: string;
  lastname: string;
  birthdate: string;
  birthcity: string;
  address: string;
  zipcode: string;
  city: string;
  offset: number;
  work: boolean;
  shop: boolean;
  health: boolean;
  sport: boolean;
  child: boolean;
  family: boolean;
}

export default function App() {
  const [state, setState] = useState<Attestation>({
    address: "",
    city: "",
    zipcode: "",
    birthcity: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    offset: 18,
    child: false,
    health: false,
    shop: false,
    sport: false,
    work: false,
    family: false,
  });

  useEffect(() => {
    AsyncStorage.getItem("state")
      .then((res) => {
        if (res) setState(JSON.parse(res));
      })
      .catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      {/* <ScrollView style={{ flex: 1 }}></ScrollView> */}
      <TextInput
        value={state.lastname}
        placeholder="Nom"
        //@ts-ignore
        onChangeText={(e) => setState({ ...state, lastname: e })}
      />

      <TextInput
        value={state.firstname}
        placeholder="Prenom"
        //@ts-ignore
        onChangeText={(e) => setState({ ...state, firstname: e })}
      />

      <TextInput
        value={state.birthcity}
        placeholder="Ville de naissance"
        //@ts-ignore
        onChangeText={(e) => setState({ ...state, birthcity: e })}
      />

      <TextInput
        value={state.birthdate}
        placeholder="Date de naissance (JJ/MM/AA)"
        //@ts-ignore
        onChangeText={(e) => setState({ ...state, birthdate: e })}
      />

      <TextInput
        value={state.address}
        placeholder="Addresse"
        //@ts-ignore
        onChangeText={(e) => setState({ ...state, address: e })}
      />

      <TextInput
        value={state.zipcode}
        placeholder="Code postal"
        //@ts-ignore
        onChangeText={(e) => setState({ ...state, zipcode: e })}
      />

      <TextInput
        value={state.city}
        placeholder="Ville"
        //@ts-ignore
        onChangeText={(e) => setState({ ...state, city: e })}
      />

      <Text>Création il y a {state.offset} minutes</Text>
      <Slider
        style={{ width: "80%" }}
        minimumValue={0}
        maximumValue={240}
        value={state.offset}
        onValueChange={(e: number) =>
          setState({ ...state, offset: Math.round(e) })
        }
      ></Slider>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <CheckBox
          value={state.child}
          onValueChange={(e) => setState({ ...state, child: e })}
        />
        <Text>Chercher les enfants</Text>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <CheckBox
          value={state.work}
          onValueChange={(e) => setState({ ...state, work: e })}
        />
        <Text>Travailler</Text>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <CheckBox
          value={state.sport}
          onValueChange={(e) => setState({ ...state, sport: e })}
        />
        <Text>Faire du sport</Text>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <CheckBox
          value={state.health}
          onValueChange={(e) => setState({ ...state, health: e })}
        />
        <Text>Raison médicale</Text>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <CheckBox
          value={state.shop}
          onValueChange={(e) => setState({ ...state, shop: e })}
        />
        <Text>Faire les courses</Text>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <CheckBox
          value={state.family}
          onValueChange={(e) => setState({ ...state, family: e })}
        />
        <Text>S'occuper de la famille</Text>
      </View>

      <TouchableOpacity
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: 50,
        }}
        onPressOut={async () => {
          if (
            Object.values(state).filter((v) => !v && typeof v === "string")
              .length != 0
          ) {
            alert("Remplissez tout les champs");
            return;
          }
          AsyncStorage.setItem("state", JSON.stringify(state));
          Linking.openURL(
            "https://covid-attestation.000webhostapp.com/" +
              encodeURI(
                `?FNAME=${state.firstname}` +
                  `&LNAME=${state.lastname}` +
                  `&BIRTHDATE=${state.birthdate}` +
                  `&BIRTHCITY=${state.birthcity}` +
                  `&ADDRESS=${state.address}` +
                  `&ZIPCODE=${state.zipcode}` +
                  `&CITY=${state.city}` +
                  `&OFFSET=${state.offset}` +
                  `${state.work ? "&WORK=TRUE" : ""}` +
                  `${state.shop ? "&SHOP=TRUE" : ""}` +
                  `${state.family ? "&FAMILY=TRUE" : ""}` +
                  `${state.child ? "&CHILD=TRUE" : ""}` +
                  `${state.health ? "&HEALTH=TRUE" : ""}` +
                  `${state.sport ? "&SPORT=TRUE" : ""}`
              )
          );
        }}
      >
        <Text>Générer</Text>
      </TouchableOpacity>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "20%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
