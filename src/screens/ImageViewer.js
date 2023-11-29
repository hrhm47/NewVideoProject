/*

                  video ky controls ky add karny hain and usko fully functional bana hy.

*/

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

const ImageViewer = () => {
  const [isImage, setIsImage] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [image, setImage] = useState(null);
  const [videof, setVideof] = useState(null);

  const openGallery = async () => {
    const options = {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        setImage(null);
      } else if (response.assets) {
        console.log(response.assets[0].uri.toString());
        setImage(response.assets[0].uri.toString());
      }
    });
  };

  const openCamera = async () => {
    console.log('openCamera');
    const options = {
      //selectionLimit: 0,
      mediaType: 'video',
      formatAsMp4: true,
      includeExtra: true,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 5,
      videoWidth: 240,
      videoHeight: 320,

      //Video max duration in seconds
      // saveToPhotos: true,
      // selectionLimit: 2,
      // aspectRatio: '16:9',
    };

    // const duration=(curTime)=>{
    //   return curTime<=5? curTime:duration;
    // }

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled Video Picker');
        setVideof(null);
      } else if (response.assets) {
        console.log(response.assets);
        setVideof(response.assets[0].uri.toString());
      }
    });

    // ImagePicker.launchImageLibrary(options, response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled Video Picker');
    //     setVideof(null);
    //   } else if (response.assets) {
    //     console.log(response.assets[0].uri.toString());
    //     setVideof(response.assets[0].uri.toString());
    //   }
    // });
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
      }}>
      {isImage ? (
        <View style={{backgroundColor: 'red'}}>
          {image ? (
            <Image source={{uri: image}} style={{width: 200, height: 200}} />
          ) : null}
        </View>
      ) : null}

      <TouchableOpacity
        style={{
          top: 30,
          backgroundColor: '#fff',
          width: 150,
          borderRadius: 10,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}
        onPress={() => {
          setIsImage(isImage => !isImage);
          if (!isImage) {
            openGallery();
          } else {
            setVideof(null);
          }
        }}>
        <Text style={{color: 'black'}}>ImageViewer</Text>
      </TouchableOpacity>
      {isVideo ? (
        <View
          style={{
            height: 400,
            width: 400,
            backgroundColor: 'red',
            justifyContent: 'center',
            marginTop: 40,
          }}>
          {videof != null ? (
            <Video
              onError={e => console.log(e)}
              source={{
                uri: videof,
                title: 'Custom Title',
                subtitle: 'Custom Subtitle',
                description: 'Custom Description',
              }}
              // videoWidth={ 240}
              // videoHeight={320}
              // width={240}
              // height={260}
              resizeMode="cover"
              style={{width: 400, height: 400}}
              controls={true}
              loop={true}
              subtitleStyle={{paddingBottom: 10, fontSize: 20}}
            />
          ) : null}
        </View>
      ) : null}
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          width: 150,
          borderRadius: 10,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 40,
        }}
        onPress={() => {
          setIsVideo(isVideo => !isVideo);
          if (!isVideo) {
            openCamera();
          }
          // else{
          // setIsVideo(null);
          // }
        }}>
        <Text style={{color: 'black'}}>Image Video</Text>
      </TouchableOpacity>
      <View style={{flex: 1}}></View>
    </View>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
