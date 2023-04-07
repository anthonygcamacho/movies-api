import { Component, State, h } from "@stencil/core";
import axios from "axios";

@Component({
  tag: "agcamacho-api-key-table",
  styleUrl: "./api-key-table.scss",
  scoped: true,
})
export class ApiKeyTable {
  @State() apiKey: Date;
  @State() apiKeyCreated: string;
  @State() tableRowsObjs = [];
  @State() tableRowsEls = [];
  @State() tableRowId = 1;
  @State() generateBtnDisabled = false;

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
        <tr data-rowId={row.rowId} class="api-key-table__body__row">
          <td class="api-key-table__body__row__column api-key-table__row__column__apikeycreated">
            {row.created}
          </td>
          <td class="api-key-table__body__row__column api-key-table__row__column__apikey">
            {row.apiKeyToShow}
          </td>
          <td class="api-key-table__body__row__column api-key-table__row__column__actions">
            <a data-rowId={row.rowId} onClick={(e) => this.onApiKeySee(e)}>
              See
            </a>
            <a data-rowId={row.rowId} onClick={(e) => this.onApiKeyCopy(e)}>
              Copy
            </a>
            <a data-rowId={row.rowId} onClick={(e) => this.onTableRowRemove(e)}>
              Remove
            </a>
          </td>
        </tr>
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

  // Generate key submit
  onGenerateApiKey(e: Event) {
    e.preventDefault();
    let that = this;
    console.log("generate key");
    let token = localStorage.getItem("token");
    this.generateBtnDisabled = true;
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
        this.generateBtnDisabled = false;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.code);
        console.log(err.response.status);
        this.generateBtnDisabled = false;
      });
  }

  // Todo: add jsx for create new password
  render() {
    return (
      <div class="api-key-table">
        <div class="api-key-table__toolbar">
          <button
            class="api-key-table__toolbar__generate button button-blue"
            disabled={this.generateBtnDisabled}
            type="submit"
            onClick={this.onGenerateApiKey.bind(this)}
          >
            {this.generateBtnDisabled ? (
              <div>
                <i class="fa-solid fa-spinner fa-spin"></i>
              </div>
            ) : (
              <span>Generate API Key</span>
            )}
          </button>
        </div>
        <table class="api-key-table__table-wrapper">
          <thead class="api-key-table__header">
            <tr>
              <th class="api-key-table__header__column api-key-table__header__column__apikeycreated">
                Created
              </th>
              <th class="api-key-table__header__column api-key-table__header__column__apikey">
                API Key
              </th>
              <th class="api-key-table__header__column api-key-table__header__column__actions">
                Actions
              </th>
            </tr>
          </thead>
          <tbody id="api-key-table__body">{this.tableRowsEls}</tbody>
        </table>
      </div>
    );
  }
}
