import React from 'react';
import styled from 'styled-components';
import DefaultTemplate from 'components/templates/DefaultTemplate';

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const Home = () => (
  <DefaultTemplate>
    <Title>Welcome to static page</Title>
    <h1>h1 - This is a main title</h1>
    <h2>h2 - This is a subtitle</h2>
    <h3>h3 - This is a section title</h3>
    <h4>h4 - This is a section subtitle</h4>

    <p>
      <b>There is a body text</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Purus gravida quis blandit turpis. Lobortis elementum nibh tellus
      molestie nunc. Felis donec et odio pellentesque diam. Sit amet nisl purus in. Interdum consectetur libero id
      faucibus nisl tincidunt. Tincidunt dui ut ornare lectus sit amet est placerat. Dolor sed viverra ipsum nunc
      aliquet bibendum enim facilisis gravida. Eget aliquet nibh praesent tristique magna sit amet. Accumsan lacus vel
      facilisis volutpat est velit egestas. Libero nunc consequat interdum varius sit. Blandit libero volutpat sed cras
      ornare arcu dui vivamus arcu. Aliquam etiam erat velit scelerisque in dictum non consectetur. Sit amet venenatis
      urna cursus. Tristique senectus et netus et malesuada fames. Mauris a diam maecenas sed.
    </p>
    <p>
      Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Et malesuada fames ac turpis egestas. At
      quis risus sed vulputate. Massa vitae tortor condimentum lacinia quis vel eros donec. Eget gravida cum sociis
      natoque penatibus et magnis dis parturient. Suspendisse ultrices gravida dictum fusce ut placerat. Auctor elit sed
      vulputate mi sit amet mauris commodo quis. Sit amet risus nullam eget felis eget. Amet est placerat in egestas
      erat imperdiet sed. Et sollicitudin ac orci phasellus egestas tellus. Feugiat in ante metus dictum at tempor
      commodo ullamcorper a.
    </p>
    <p>
      Sit amet consectetur adipiscing elit ut. Purus in massa tempor nec feugiat nisl. Ipsum dolor sit amet consectetur
      adipiscing. Enim lobortis scelerisque fermentum dui faucibus in ornare quam. Felis bibendum ut tristique et
      egestas. Ultrices mi tempus imperdiet nulla. Ullamcorper malesuada proin libero nunc. Sed cras ornare arcu dui
      vivamus arcu felis. Duis ut diam quam nulla porttitor massa id neque aliquam. In ante metus dictum at tempor.
      Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Tortor id aliquet lectus proin nibh nisl
      condimentum. Maecenas ultricies mi eget mauris pharetra et ultrices neque ornare. At tellus at urna condimentum
      mattis pellentesque id nibh. Semper auctor neque vitae tempus quam pellentesque nec. Cursus vitae congue mauris
      rhoncus aenean. Aliquet risus feugiat in ante metus dictum. Sed vulputate mi sit amet mauris commodo quis
      imperdiet.
    </p>
  </DefaultTemplate>
);

export default Home;
