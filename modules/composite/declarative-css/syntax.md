### Declarative syntax
```
base
{
  set font-size to 16px
  set font-family to sans-serif
}

group `large text`
{
  set font-size to 2rem
}

div
{
  device `laptop`
  {

  }

  device .. `tablet`
  {

  }

  device `tablet` .. `laptop`
  {

  }

  device `tablet` ..
  {

  }
}
```

### CSS engine syntax
```
:root
{
  font-size: 16px;
  font-family: sans-serif;
}

.large-text
{
  font-size: 2rem;
}


```