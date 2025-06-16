### Proposed readable syntax
```
base
{
  set font-size to 16px
  set font-family to sans-serif
}

group 'large text'
{
  set font-size to 2rem
}

input
{
  attribute name
  {

  }

  attribute name is missing
  {
    
  }

  attribute type is 'text'
  {

  }

  attribute type is not 'text'
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