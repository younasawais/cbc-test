import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCityByNameSuccess } from '../actions'
import HomePage from '../components/home-page'

const mapStateToProps = ({ city }) => ({
  city,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        getCityByNameSuccess,
    },
    dispatch,
  )

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage)

export default HomePageContainer
