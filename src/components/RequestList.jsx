import React from "react"
import PropTypes from "prop-types"

const RequestList = (props) => {
  const pendingReqs = props.requests.filter(book => !book.requestApproved)
  const approvedReqs = props.requests.filter(book => book.requestApproved)

  return (
    <div>
      {pendingReqs.length > 0 ?
        <div>
          <h3>Pending requests</h3>
          <ul>
            {pendingReqs.map(book => (
              <li className="list-item" key={book._id}>
                {book.title}
                {props.approveRequest ?
                  <i
                    className="fa fa-check"
                    aria-hidden="true"
                    onClick={() => props.approveRequest(book._id)}
                  />
                  : null
                }
                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  onClick={() => props.removeRequest(book._id)}
                />
              </li>
            ))}
          </ul>
        </div> :
        null
      }
      {approvedReqs.length > 0 ?
        <div>
          <h3>Approved requests</h3>
          <ul>
            {approvedReqs.map(book => (
              <li key={book._id}>
                <span className="list-item">{book.title}</span>
              </li>
            ))}
          </ul>
        </div> :
        null
      }
    </div>
  )
}

RequestList.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeRequest: PropTypes.func.isRequired, // ESLint bug?
  approveRequest: PropTypes.func
}

RequestList.defaultProps = {
  approveRequest: null
}

export default RequestList
