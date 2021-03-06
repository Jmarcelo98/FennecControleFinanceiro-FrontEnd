// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  CAMINHO_RAIZ: "http://localhost:8080",
  FORMATAR_DATA: atribuirZero()
};

function atribuirZero(): string {

  if (new Date().getHours() < 10) {
    return "T0" + new Date().getHours() + ":00:00.961Z"
  } else {
    return "T" + new Date().getHours() + ":00:00.961Z"

  }
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
