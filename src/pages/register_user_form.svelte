<Page class="register-page">
  <Block class="container-register">
    <List strongIos dividersIos insetIos>
      <br />
      <LoginScreenTitle>Register</LoginScreenTitle>
      <br />
      <ListInput
        outline
        label="E-mail"
        floatingLabel
        info=""
        validate
        type="email"
        placeholder="Your e-mail"
        clearButton
        required
        bind:value={email}
      />
      <ListInput
        outline
        label="Password"
        floatingLabel
        info=""
        validate
        type="password"
        placeholder="Your password"
        clearButton
        required
        bind:value={password}
      />
      <ListInput
        outline
        label="Name"
        floatingLabel
        info=""
        validate
        type="text"
        placeholder="Your username"
        clearButton
        required
        bind:value={username}
      />
      <ListInput
        outline
        label="Bio"
        floatingLabel
        type="textarea"
        resizable
        placeholder="Bio"
        clearButton
        bind:value={bio}
      />
      <br />
      <div class="container_btn">
        <Button
          preloader
          loading={isLoading2}
          onClick={load2}
          large
          fill
          round
          class="submit_btn"
          on:click={toVerify}>Register</Button
        >
      </div>
      <br />
    </List>
  </Block>
</Page>

<script>
  import {
    Button,
    Page,
    Block,
    List,
    ListInput,
    LoginScreenTitle,
    f7,
  } from 'framework7-svelte';
  import '../css/register.css';

  let isLoading2 = false;
  let username = '';
  let email = '';
  let password = '';
  let bio = '';

  const load2 = () => {
    if (isLoading2) return;
    isLoading2 = true;
    setTimeout(() => {
      isLoading2 = false;
    }, 1000);
  };

  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  let notificationCloseOnClick;
  function showNotificationCloseOnClick() {
    if (!notificationCloseOnClick) {
      notificationCloseOnClick = f7.notification.create({
        icon: '<i f7="hand_raised_slash" color="black"></i>',
        title: 'ChefMate',
        titleRightText: 'now',
        subtitle: 'Wrong data submited',
        text: 'Click me to close',
        closeOnClick: true,
      });
    }
    notificationCloseOnClick.open();
  }

  function toVerify() {
    if (!username) {
      showNotificationCloseOnClick();
      return;
    }
    if (!email) {
      showNotificationCloseOnClick();
      return;
    }
    if (!validateEmail(email)) {
      showNotificationCloseOnClick();
      return;
    }
    if (!password || password.length < 8) {
      showNotificationCloseOnClick();
      return;
    }
  }
</script>