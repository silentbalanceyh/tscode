import Pure from './Intra.Pure'
import Short from './Intra.Short'
import Select from './Intra.Select'
import Matrix from './Intra.Matrix'
import Date from './Intra.Date'
import Search from './Intra.Search'
import Multi from './Intra.Multi'
import Check from './Intra.Check'
import Label from './Intra.Label'
import Button from './Intra.Button'
import Distinct from './Intra.Distinct'
import Duration from './Intra.Duration'
import File from './Intra.File'
import Color from './Intra.Color'
import Tree from './Intra.Tree'

export default {
  "field":{
    "text":Short.render,
    "duration":Duration.render,
    "async":Short.render,
    "password":Short.render,
    "number":Short.render,
    "hidden":Pure.render,
    "tabular":Select.render,
    "dropdown":Select.dropdown,
    "date":Date.render,
    "list.selector":Search.render,
    "distinct.selector":Distinct.render,
    "multitext":Multi.render,
    "counter":Short.render,
    "arrayitem":Pure.render,
    "checkbox":Check.render,
    "combo":Select.combo,
    "file":File.render,
    "color":Color.render,
    "tree.selector":Tree.render
  },
  "label":{
    "common":Label.common,
    "logical":Label.logical,
    "date":Label.date,
    "tabular":Label.tabular,
    "currency":Label.currency,
    "state":Label.state,
    "button":Button.view,
    "fixed":Label.fixed,
    "assist":Label.assist,
    "linker":Label.linker,
  },
  "filter":{
    "march":Pure.marcher,
    "tabular":Select.tabular,
    "dropdown":Select.dropdown,
    "ranger":Matrix.marcher
  }
}
