import { Component, State, h } from "@stencil/core";
import axios from "axios";

@Component({
  tag: "agcamacho-api-key-form",
  styleUrl: "./api-form.scss",
  scoped: true,
})
export class ApiForm {
  @State() apiKey: Date;
  @State() apiKeyCreated: string;
  @State() tableRowsObjs = [];
  @State() tableRowsEls = [];
  @State() tableRowId = 1;

  // After initial load processes
  connectedCallback() {
    // let that = this;
    let token = localStorage.getItem("token");
    axios
      .get("/admin/apikey", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("get all", res);
        let apiKeysMapped = res.data.map((item) => {
          let apiKeyBlocked = `***********************************************************${item.api_key.slice(
            -5
          )}`;
          let newRow = {
            rowId: this.tableRowId,
            apiKey: item.api_key,
            apiKeyBlocked,
            apiKeyShow: "hide",
            apiKeyToShow: apiKeyBlocked,
            created: item.api_key_created,
          };
          ++this.tableRowId;
          return newRow;
        });
        this.tableRowsObjs = [...[], ...apiKeysMapped];
        this.updateTableRows();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.code);
        console.log(err.response.status);
      });
  }

  getRowObj(rowId: string) {
    return this.tableRowsObjs.filter((row) => {
      return row.rowId == rowId;
    });
  }

  onApiKeyCopy(e: Event) {
    let el = e.target as HTMLElement;
    let rowId = el.getAttribute("data-rowId");
    let rowObj = this.getRowObj(rowId);
    navigator.clipboard.writeText(rowObj[0].apiKey);
  }

  onApiKeySee(e: Event) {
    let el = e.target as HTMLElement;
    let rowId = el.getAttribute("data-rowId");
    let rowObj = this.getRowObj(rowId);
    console.log(rowObj);
    if (rowObj[0].apiKeyShow == "hide") {
      rowObj[0].apiKeyToShow = rowObj[0].apiKey;
      rowObj[0].apiKeyShow = "show";
    } else {
      rowObj[0].apiKeyToShow = rowObj[0].apiKeyBlocked;
      rowObj[0].apiKeyShow = "hide";
    }
    this.updateTableRows();
  }

  updateTableRows() {
    let rowsTemp = [];
    this.tableRowsObjs.forEach((row) => {
      let newRow = (
        <div data-rowId={row.rowId}>
          <div class="header__column header__column__apikeycreated">
            {row.created}
          </div>
          <div class="header__column header__column__apikeyexpires"></div>
          <div class="header__column header__column__apikey">
            {row.apiKeyToShow}
          </div>
          <div class="header__column header__column__actions">
            <a data-rowId={row.rowId} onClick={(e) => this.onApiKeySee(e)}>
              See
            </a>
            <a data-rowId={row.rowId} onClick={(e) => this.onApiKeyCopy(e)}>
              Copy
            </a>
            <a data-rowId={row.rowId} onClick={(e) => this.onTableRowRemove(e)}>
              Remove
            </a>
          </div>
        </div>
      );
      rowsTemp.push(newRow);
    });
    this.tableRowsEls = [...[], rowsTemp];
  }

  onTableRowRemove(e: Event) {
    e.preventDefault();
    let el = e.target as HTMLElement;
    let rowId = el.getAttribute("data-rowId");
    let rowObj = this.getRowObj(rowId);
    let token = localStorage.getItem("token");
    axios
      .delete("/admin/apikey", {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          apiKey: rowObj[0].apiKey,
        },
      })
      .then((res) => {
        console.log(res);
        this.tableRowsObjs = this.tableRowsObjs.filter((row) => {
          return row.rowId != rowId;
        });
        this.updateTableRows();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onTableRowCreate(apiKey: string, created: string) {
    let apiKeyBlocked = `***********************************************************${apiKey.slice(
      -5
    )}`;
    let newRow = {
      rowId: this.tableRowId,
      apiKey,
      apiKeyBlocked,
      apiKeyShow: "hide",
      apiKeyToShow: apiKeyBlocked,
      created,
    };
    this.tableRowsObjs = [...this.tableRowsObjs, newRow];
    console.log(this.tableRowsObjs);
    ++this.tableRowId;
    this.updateTableRows();
  }

  // Form submit
  onGenerateApiKey(e: Event) {
    e.preventDefault();
    let that = this;
    console.log("generate key");
    let token = localStorage.getItem("token");
    axios
      .post(
        "/admin/apikey",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        let { apiKey, apiKeyCreated } = res.data;
        that.onTableRowCreate(apiKey, apiKeyCreated);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.code);
        console.log(err.response.status);
      });
  }

  // Todo: add jsx for create new password
  render() {
    return (
      <div id="api-key-form">
        <button
          class="form__generate button"
          onClick={this.onGenerateApiKey.bind(this)}
        >
          Generate API Key
        </button>
        <div id="api-key-form__table">
          <div id="api-key-form__table__header">
            <div class="header__column header__column__apikeycreated">
              Created
            </div>
            <div class="header__column header__column__apikey">API Key</div>
            <div class="header__column header__column__actions">Actions</div>
          </div>
          <div id="api-key-form__table__body">{this.tableRowsEls}</div>
        </div>
      </div>
    );
  }
}
