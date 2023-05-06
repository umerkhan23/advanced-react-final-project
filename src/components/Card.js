import { Heading, HStack, Image, Text, VStack, Card, CardBody } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const CardP = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <Card style={{'borderRadius':'15px'}} zIndex='0'>
      <Image src={imageSrc} style={{'borderRadius':'inherit'}}></Image>
      <CardBody>
        <VStack spacing={4} alignItems='flex-start'>
        <Heading size='lg'>{title}</Heading>
        <Text style={{'color':'grey'}}>{description}</Text>
        <HStack>
          <Text style={{'fontWeight':'bold'}}>See more</Text>
          <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
        </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default CardP;
