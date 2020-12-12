import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, ScrollView, TextInput } from 'react-native';

export default function App() {
  const [wikiContent, setWikiContent] = useState("");
  return (
    <ScrollView>
      <TextInput
        placeholder="type in me!"
        onChangeText={(text) => handleTextChange(text, setWikiContent)}
        style={ {textAlign: "center", padding: 10, fontSize: 42} }
      />
      <Text>{wikiContent}</Text>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const handleTextChange = async (text, setWikiContent) => {
  const searchUrl =
    "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
  const contextUrl =
    "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=";
  let searchResponse = await fetch(searchUrl + text);
  let search = await searchResponse.json();
  let title1 = search[1][1];

  let contentResponse = await fetch(contextUrl + title1);
  let content = await contentResponse.json();
  let page = content.query.pages;
  let pageId = Object.keys(page)[0];

  setWikiContent(page[pageId].revisions[0]["*"]);
};


