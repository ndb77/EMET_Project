import React from 'react'

const AddMedication= () => {
  return (
<div className="container" style={{marginTop: 12, maxWidth: 960}}>
  <div className="row">
    <div className="col-auto mx-auto">
      <h1 style={{textAlign: 'center'}}>Add a medication</h1>
      <hr />
    </div>
  </div>
  <div className="row" style={{marginTop: 20}}>
    <div className="col">
      <h4 style={{textAlign: 'center'}}>Use the dropdown menus to add a new medication</h4>
    </div>
  </div>
  <div className="row" style={{marginTop: 20, minHeight: 400}}>
    <div className="col">
      <div className="hrz-txt-scroll" style={{overflow: 'scroll', paddingRight: 0, paddingLeft: 0}}>
        <div className="col-auto">
          <div className="row d-lg-flex justify-content-lg-center" style={{height: 400}}>
            <div className="col-auto mx-auto">
              <div className="row" style={{minHeight: 38, marginBottom: 10}}>
                <div className="col">
                  <h4 style={{textAlign: 'right'}}>Name of new medication</h4>
                </div>
                <div className="col-auto"><input type="text" /></div>
              </div>
              <div className="row d-flex" style={{minHeight: 38, marginBottom: 10}}>
                <div className="col">
                  <h4 style={{textAlign: 'right'}}>Strength</h4>
                </div>
                <div className="col">
                  <div className="dropdown"><button className="btn btn-primary dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">Dropdown </button>
                    <div className="dropdown-menu"><a className="dropdown-item" href="#">First Item</a><a className="dropdown-item" href="#">Second Item</a><a className="dropdown-item" href="#">Third Item</a></div>
                  </div>
                </div>
              </div>
              <div className="row d-flex" style={{minHeight: 38, marginBottom: 10}}>
                <div className="col">
                  <h4 style={{textAlign: 'right'}}># of pills at one time</h4>
                </div>
                <div className="col">
                  <div className="dropdown"><button className="btn btn-primary dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">Dropdown </button>
                    <div className="dropdown-menu"><a className="dropdown-item" href="#">First Item</a><a className="dropdown-item" href="#">Second Item</a><a className="dropdown-item" href="#">Third Item</a></div>
                  </div>
                </div>
              </div>
              <div className="row d-flex" style={{minHeight: 38, marginBottom: 10}}>
                <div className="col">
                  <h4 style={{textAlign: 'right'}}>Prescribing physician</h4>
                </div>
                <div className="col">
                  <div className="dropdown"><button className="btn btn-primary dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" type="button">Dropdown </button>
                    <div className="dropdown-menu"><a className="dropdown-item" href="#">First Item</a><a className="dropdown-item" href="#">Second Item</a><a className="dropdown-item" href="#">Third Item</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="row d-flex d-lg-flex justify-content-center flex-nowrap justify-content-lg-center" style={{marginTop: 50, marginBottom: 20, position: 'relative'}}>
    <div className="col-auto" style={{textAlign: 'center'}}><a className="btn btn-primary" role="button" style={{marginRight: 20, background: 'var(--bs-danger-bg-subtle)', color: 'var(--bs-emphasis-color)'}} href="current-medications-1-1.html">Discard Changes</a></div>
    <div className="col-auto" style={{textAlign: 'center'}}><a className="btn btn-primary" role="button" style={{marginLeft: 20, color: 'var(--bs-emphasis-color)', background: 'var(--bs-success-border-subtle)'}} href="current-medication-confirm-changes.html">Save Changes</a></div>
  </div>
</div>

  )
}

export default AddMedication